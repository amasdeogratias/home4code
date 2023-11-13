import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'

class Home extends Component {
  render() {
    return (
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <h1>Home Page</h1>
        
      </div>
    )
  }
}

export default Home

