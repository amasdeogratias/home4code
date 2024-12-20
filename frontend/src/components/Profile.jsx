import React, { Component } from 'react'

class Profile extends Component {
  render() {
    
    let name
    let email
    if(this.props.user) {
      name = this.props.user.name
      email = this.props.user.email
    }
    
    if(!localStorage.getItem('token')){
      return window.location.href='/sign-in' 
    }
    return (
      <div className='dashboard_container'>
        <div className='container'>
          <div className="row mt-4">
              <div className="jumbotron col-lg-4 offset-lg-4">
                  <h3 className="text-center">User Profile</h3>
                  <ul className="list-group">
                      <li className='list-group-item'>Name: {name}</li>
                      <li className='list-group-item'>Email: {email}</li>
                  </ul>
              </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Profile
