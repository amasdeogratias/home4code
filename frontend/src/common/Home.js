import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
  state = {
    tasks:[],
    users:[]
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
  render() {
    return (
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <Link to={"/tasks"} style={{textDecoration: "none"}}>
                            <div className="card-body text-white">
                                <p className="mb-4">Total Users</p>
                                <p className="fs-30 mb-2">5</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <Link to={"/tasks"} style={{textDecoration: "none"}}>
                            <div className="card-body text-white">
                                <p className="mb-4">Total Tasks Present</p>
                                <p className="fs-30 mb-2">{this.state.tasks.length}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home

