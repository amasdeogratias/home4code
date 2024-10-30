import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
  
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
  }
  
  registerUser = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    axios.post('/register', data)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      this.setState({
        loggedIn: true
      })
      this.props.setUser(response.data.user)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  
  render() {
     //if register in redirect to profile
     if(this.state.loggedIn){
      return window.location.href = '/profile'
    }
    
    if(localStorage.getItem('token')){
      return window.location.href='/profile' 
    }
    return (
      <div className='login_container'>
        <div className="row mt-4">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Register</h3>
          <form onSubmit={this.registerUser}>
            <div className="mb-3">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                required
                onChange={(e) => {this.setState({name:e.target.value})}}
              />
            </div>
            
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                required
                onChange={(e) => {this.setState({email:e.target.value})}}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                required
                onChange={(e) => {this.setState({password:e.target.value})}}
              />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                className="form-control"
                placeholder="Enter password confirmation"
                required
                onChange={(e) => {this.setState({password_confirmation:e.target.value})}}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <Link to="/sign-in" style={{color:'white', textDecoration:'none'}}>sign in?</Link>
            </p>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
