import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: []
        };
    }
    
    componentDidMount() {
        this.fetchTasks();
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
                        <Link className='btn btn-primary btn-sm'><i className='fas fa-edit'></i>Edit</Link>
                        <Link className='btn btn-danger btn-sm'><i className='fas fa-edit'></i>Delete</Link>
                    </td>
                </tr>
            )
        });
    }
  render() {
    return (
        <div className="row mt-4">
            <div className="jumbotron">
                <div className='ml-4'>
                    <Link className='btn btn-success' to='/create-task'>Create new Task</Link>
                </div>
                <br />
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
    )
  }
}

export default Task
