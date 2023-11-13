import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className='nav'>
            <li className="nav-item">
				<Link className="nav-link" to={"/"}>
					<i className="icon-grid menu-icon"></i>
					<span className="menu-title">Dashboard</span>
				</Link>
			</li>
            <li className="nav-item">
				<Link className="nav-link" to={'/tasks'}>
					<i className="icon-grid menu-icon"></i>
					<span className="menu-title">Tasks</span>
				</Link>
			</li>
        </ul>
      </nav>
    )
  }
}

export default Sidebar
