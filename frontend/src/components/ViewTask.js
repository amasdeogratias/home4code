import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import Sidebar from './Sidebar'

const ViewTask = () => {
    const {task_id} = useParams([])
    
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState("Low")
    const [style, setStyle] = useState({color:'black'})
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      axios.get(`/tasks/${task_id}`)
    .then(res => {
        console.log(res.data)
        setTask(res.data)
        setLoading(false);
    })
    .catch(error => {
        console.log(error);
        setLoading(false);
    });
      
    });
    
    if (task.priority === "1") {
      setPriority("High");
      setStyle({ color: "red" });
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
                          <h3 className="card-title">Task Priority: <span style={style}>{priority}</span></h3>
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
                                    <input type="text" name="user_id" id="user_id" className="form-control" readOnly value={task.user_id} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Task description</label>
                                <textarea name="description" id="description" rows="3" className="form-control" value={task.description} ></textarea>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-6">
                                  <label htmlFor="start_date"></label>
                                  <input type="date" name="start_date" id="start_date" className="form-control" readOnly value={task.start_date} />
                                </div>
                                <div className="form-group col-md-6">
                                  <label htmlFor="end_date"></label>
                                  <input type="date" name="end_date" id="end_date" className="form-control" placeholder="Enter end date" readOnly value={task.end_date} />
                                </div>
                                <div className="form-group col-md-6">
                                  <label htmlFor="duration"></label>
                                  <input type="text" name="duration" id="duration" className="form-control" readOnly value={task.duration} />
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
