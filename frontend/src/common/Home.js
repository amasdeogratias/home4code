import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
  state = {
    tasks: [],
    users: []
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
      <div className='login_container'>
        <div className='login_container login'>
          <div className="login_form mt-4">
            <h3 className='login_title'>Welcome to Project Management System</h3>
            {
              localStorage.getItem('token') ? (
                <div className='card'>
                  <div className='row'>
                    <div className='card-header'>
                      <h3 className='card-title'>Dashboard</h3>
                    </div>
                    <div className='card-body'>
                      {/* Add any content here if needed */}
                    </div>
                  </div>
                </div>
              ) : (
                <Link to='/sign-in' className='login_redirect'>Login</Link>
              )
            }

          </div>
        </div>

      </div>
    )
  }
}

export default Home

