import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class CreateTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  
    state = {
        title: '',
        description: '',
        priority: '',
        start_date: '',
        duration: '',
        end_date: '',
        user_id: '',
        message: '',
       
    };
    
    componentDidMount() {
      this.fetchUsers();
  }
    
    fetchUsers = () => {
      axios.get('/users/all')
      .then(response => {
        this.setState({users: response.data})
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    };
    
    renderOption() {
      return this.state.users.map(user => {
        return (
          <option key={user.id} value={user.id}>{user.name}</option>
        )
      });
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        title: this.state.title,
        description: this.state.description,
        priority: this.state.priority,
        start_date: this.state.start_date,
        duration: this.state.duration,
        end_date: this.state.end_date,
        user_id: this.state.user_id,
      }
      axios.post('/tasks', data)
      .then(response => {
        this.setState({ message: response.data.message });
        document.querySelector('form').reset();
      })
      .catch(error => {
        this.setState({ message: error.response.data.message });
      if (this.state.message) {
        let error = this.state.message;
        Swal.fire({
          title: "Warning",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      });
    }
  render() {
    const style = {
      float: 'right'
    };
    let success = "";
    if(this.state.message){
      success = (
            <div>
                <div className="alert alert-success" role='alert'>
                    {this.state.message}
                </div>
            </div>
        )
    }
    return (
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">Add Task Details
                    <Link to="/tasks" className="btn btn-success btn-sm btn-rounded" style={style}><i className="ti-icon ti-list"></i> View Tasks</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="text-center">{ success }</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6">
                          <label htmlFor="title">Task Name</label>
                          <input type="text"
                              name="title" 
                              id="title"
                              className="form-control"
                              placeholder="Enter Task Name"
                              required
                              onChange={e=> {this.setState({title:e.target.value})}}
                          />
                      </div>
                      <div className="form-group col-md-6">
                          <label htmlFor="title">Assign User</label>
                          <select name="user_id" id="user_id" className="form-control" onChange={e=> {this.setState({user_id:e.target.value})}}>
                            <option value="">Select user</option>
                            {this.renderOption()}
                          </select>
                      </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Task description</label>
                        <textarea 
                            name="description" 
                            id="description"  
                            rows="3"
                            className="form-control"
                            onChange={e=> {this.setState({description:e.target.value})}}
                        >
                            
                        </textarea>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="start_date"></label>
                        <input 
                          type="date" 
                          name="start_date" 
                          id="start_date"
                          className="form-control"
                          placeholder="Enter start date"
                          required
                          onChange={e=> {this.setState({start_date:e.target.value})}}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="end_date"></label>
                        <input 
                          type="date" 
                          name="end_date" 
                          id="end_date"
                          className="form-control"
                          placeholder="Enter end date"
                          required
                          onChange={e=> {this.setState({end_date:e.target.value})}}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="duration"></label>
                        <input 
                          type="text" 
                          name="duration" 
                          id="duration"
                          className="form-control"
                          placeholder="Enter duration"
                          required
                          onChange={e=> {this.setState({duration:e.target.value})}}
                        />
                      </div>
                      <div className="form-check col-md-6 mt-5">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" name="priority" onChange={e=> {this.setState({priority:e.target.value})}} />
                          Priority
                        </label>
                      </div>
                    </div>
                    <div className="text-center float-right">
                      <button type="submit" className="btn btn-primary mr-2">Save</button>
                    </div>
                  </form>
                  </div>
                  </div>
                  </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTask
