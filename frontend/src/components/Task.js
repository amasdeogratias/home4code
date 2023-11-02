import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            loading: true
        };
    }
    
    componentDidMount() {
        this.fetchTasks();
        this.setState({loading: true})
    }
    
    fetchTasks = () => {
        axios.get('/tasks')
        .then(response => {
            this.setState({ tasks: response.data });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    };
    deleteTask = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting this task...'
        
        axios.delete(`tasks/${id}`)
        .then(response => {
            console.log("Deleted successfully"+response)
            thisClicked.closest('tr').remove();
        })
        .catch(error => {
           console.log(error.response.data); 
        });
    };
    renderTableData() {
        return this.state.tasks.map((task, index) => {
            const { id, title, start_date, end_date, name } = task;
            return (
                <tr key={id}>
                    <td>{ index+1 }</td>
                    <td>{ title }</td>
                    <td>{ start_date }</td>
                    <td>{ end_date }</td>
                    <td>{ name }</td>
                    <td>{ name }</td>
                    <td>
                        <Link to={`/edit-task/${id}`} className='btn btn-primary btn-sm'><i className='fas fa-edit'></i>Edit</Link>
                        <button type='button' onClick={e => {this.deleteTask(e,id)}} className='btn btn-danger btn-sm'><i className='fas fa-edit'></i>Delete</button>
                    </td>
                </tr>
            )
        });
    }
  render() {
    if(!localStorage.getItem('token')){
        return window.location.href='/sign-in' 
      }
      const style = {
        float: 'right'
      };
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                        <h3 className="font-weight-bold">Task Details
                            <Link to="/create-task" className="btn btn-success btn-sm btn-rounded" style={style}><i className="ti-icon ti-plus"></i> Create Task</Link>
                        </h3>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="text-center"></h4>
                                <table className="table table-bordered table-striped" id='example1'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Task Name</th>
                                            <th>Active</th>
                                            <th>Deadline</th>
                                            <th>Created By</th>
                                            <th>Responsible Person</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    )
  }
}

export default Task
