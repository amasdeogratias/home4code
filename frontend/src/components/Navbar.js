import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className='navbar-brand' to={'/'}> Easy Learning</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="navbar-brand" to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/profile'}>Profile</Link>
                
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/sign-in'}>Login</Link>
                    
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/sign-up'}>Sign up</Link>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </nav>
    )
  }
}

export default Navbar