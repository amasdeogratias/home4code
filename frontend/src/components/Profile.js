import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
            <div className="jumbotron col-lg-4 offset-lg-4">
                <h3 className="text-center">User Profile</h3>
                <ul className="list-group">
                    <li className='list-group-item'>Name: Deo Amas</li>
                    <li className='list-group-item'>Email: admin@gmail.com</li>
                </ul>
            </div>
        </div>
        
      </div>
    )
  }
}

export default Profile
