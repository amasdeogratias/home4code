import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import moment from 'moment';


const ViewTask = (props) => {
    const {task_id} = useParams([])
    
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState(false)
    const [style, setStyle] = useState({color:'black'})
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user_id, setUserId] = useState();
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [overdue, setOverdue] = useState('');
    const [body, setBody] = useState('')
    const [comments, setComments] = useState([])
    
    let userId;
    let username;
    if(props.user){
      userId = props.user.id
      username = props.user.name
    }
    
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/tasks/${task_id}`);
          console.log(response)
          setTask(response.data);
          setName(response.data.user.name);
          setLoading(false);
          if (response.data.priority === true) {
            setPriority("High");
            setStyle({ color: "red" });
          }else{
            setPriority("Low");
            setStyle({ color: "black" });
          }
          if(moment(response.data.end_date) < (moment())){
            setOverdue('Overdue')
            setStyle({ color: "red" });
          }else{
            setOverdue('Active')
            setStyle({ color: "black" });
          }
        }catch(error) {
          console.error(error);
        setLoading(false);
        }
      }
      
    fetchData();
    fetchUsers();
    fetchComments()
      
    },[task_id]);
    
    
    const fetchUsers = () => {
      axios.get('/users/all')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.log(error)
      });
    }
    
    const assignTask = () => {
      const data = {
        user_id: user_id,
        task_id:task_id
      }
      console.log(data)
      axios.post('/tasks/assign', data)
      .then((response) => {
        console.log(response)
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(`Error assigning task to user ${error}`)
      })
    }
    
    const submitComment = (e) => {
      e.preventDefault();
      const data = {
        task_id: task_id,
        user_id: userId,
        body:body
      }
      axios.post('/comments/add', data)
      .then(response => {
        setBody(response.data)
        document.querySelector('form').reset();
        fetchComments()
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    const fetchComments = () => {
      axios.get(`/comments/${task_id}`)
      .then(response => {
        setComments(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    }
    
    const deleteComment = (e,id) => {
      e.preventDefault()
      
      const thisClicked = e.currentTarget;
      axios.delete(`/comments/${id}`)
      .then(response => {
        console.log("Deleted successfully"+response)
        thisClicked.closest('li').remove();
      })
      .catch(error => {
        console.log(error.response.data); 
      });
      
    }
    
    if(!localStorage.getItem('token')){
      return window.location.href='/sign-in' 
    }
    
     
  return (
    <div className="container-fluid page-body-wrapper">
      <Sidebar />
      <div className="main-panel">
          <div className="content-wrapper">
              <div className="row">
                  <div className="col-md-12 grid-margin">
                  <div className="row">
                      <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                      <h3 className="font-weight-bold">Task Details
                          <Link to="/tasks" className="btn btn-success btn-sm btn-rounded" style={{float: 'right'}}><i className="ti-icon ti-back"></i> Back</Link>
                      </h3>
                      </div>
                  </div>
                  </div>
              </div>
              
              <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-header">
                          <span>
                            {loading ? (
                                <span className='alert alert-info'>Loading...</span>
                              ) : null}
                          </span>
                          <h3 className='card-title'>
                            <span>{task.title}, <span style={style}>{overdue}</span></span>
                            <span className="float-right">Task Priority: <span style={style}>{priority}</span></span>
                          </h3>
                          
                          { message ? (
                            <div className="alert alert-success">{message}</div>
                          ) : '' }
                        </div>
                          <div className="card-body">
                              <h4 className="text-center"></h4>
                              <div className="row">
                                <input type="hidden" name="task_id" value={task.id} />
                                <div className="form-group col-md-6">
                                    <label htmlFor="title">Task Name</label>
                                    <input type="text" name="title" id="title" className="form-control" readOnly value={task.title} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="title">Assigned User</label>
                                    <input type="hidden" name="user_id" id="user_id" className="form-control" readOnly value={task.user_id} />
                                    <input type="text" name="user" id="user" className="form-control" readOnly value={name} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Task description</label>
                                <textarea name="description" id="description" rows="3" className="form-control" value={task.description} ></textarea>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-4">
                                  <label htmlFor="start_date">Started at</label>
                                  <input type="date" name="start_date" id="start_date" className="form-control" readOnly value={task.start_date} />
                                </div>
                                <div className="form-group col-md-4">
                                  <label htmlFor="end_date">Deadline</label>
                                  <input type="date" name="end_date" id="end_date" className="form-control" placeholder="Enter end date" readOnly value={task.end_date} />
                                </div>
                                <div className="form-group col-md-4">
                                  <label htmlFor="duration">Duration(Days)</label>
                                  <input type="text" name="duration" id="duration" className="form-control" readOnly value={task.duration} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-6">
                                  <select name="user_id" id="user_id" className='form-control' onChange={(e)=> {setUserId(e.target.value)}}>
                                    {users.map((user, index) => {
                                      return (
                                        <option key={index} value={user.id}>{user.name}</option>
                                      )
                                    })}
                                  
                                  </select>
                                </div>
                                <div className="form-group col-md-6">
                                  <button type='submit' className="btn btn-info" name="assign" id="assign" onClick={assignTask}>Assign Task To User</button>
                                </div>
                              </div>
                              <div className="row">
                                <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
                                  <li className="nav-item">
                                    <a className="nav-link active" id="todo-tab" data-bs-toggle="tab" href="#comment-section" role="tab" aria-controls="comment-section" aria-expanded="true">Comments</a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link" id="chats-tab" data-bs-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">Notifications</a>
                                  </li>
                                </ul>
                              </div>
                              <div className="tab-content" id="setting-content">
                                <div className="tab-pane fade show active scroll-wrapper" id="comment-section" role="tabpanel" aria-labelledby="comment-section">
                                  <div class="card">
                                    <div class="card-body">
                                      <ul class="icon-data-list">
                                        {comments.map((comment, index) => {
                                          const {id} = comment;
                                          return (
                                            <li key={index}>
                                            <div class="d-flex">
                                              <div>
                                                <p class="text-info mb-1">{name}</p>
                                                <p class="mb-0">{comment.body}</p>
                                                <small>{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</small>
                                              </div>
                                              <div className="float-right mt-2">
                                                <button type='button' className="btn btn-danger btn-sm" onClick={(e)=>deleteComment(e,id)}>delete</button>
                                              </div>
                                            </div>
                                          </li>
                                          )
                                        })}
                                        
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="row d-flex px-2 mb-0">
                                    <form className="form w-100" onSubmit={submitComment}>
                                      <div className="form-group">
                                        <textarea type="text" name="comment" rows="3" className="form-control" placeholder="Add comment" onChange={(e)=> {setBody(e.target.value)}}></textarea>
                                        
                                      </div>
                                      <div className="form-group float-right">
                                      <button type="submit" className="btn btn-primary" id="add-task">Send</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
          
              </div>
          </div>
      </div>
    </div>
  )
}

export default ViewTask
