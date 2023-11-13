import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    state = {
        logout: ''
    }
    logout = () => {
        localStorage.clear();
        this.props.setUser(null)
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
          if (localStorage.getItem('token')) {
            this.logout();
          }
        }, 60 * 60 * 1000); // 5 minutes in milliseconds
      }
      componentWillUnmount() {
        clearTimeout(this.timer);
      }
  render() {
    
    let buttons;
    let profile;
    let tasks;
    if(localStorage.getItem('token')){
      buttons = (
        <div>
            <Link className="nav-link" to ="/" onClick={this.logout}>Logout</Link>
        </div>
      ) 
      profile = (
        <div>
            <Link className="nav-link" to={'/profile'}>Profile</Link>
            
        </div>
      ) 
      tasks = (
        <div>
            <Link className="nav-link" to={'/tasks'}>Tasks</Link>
        </div>
      )
    }else{
        buttons = (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-in'}>Login</Link>
            
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/sign-up'}>Sign up</Link>
                    </li>
                </ul>
            </div>
          ) 
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
                            { profile }
                
                        </li>
                        <li className="nav-item">
                            { tasks }
                        </li>
                    </ul>
                    <span className="navbar-text">
                        { buttons }
                    </span>
                </div>
            </div>
        </nav>
        
    )
  }
}

export default Navbar
