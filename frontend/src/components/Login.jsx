import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  }
  
  formSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    try {
      const response = await axios.post('/login', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      this.setState({
        loggedIn: true
      });
    this.props.setUser(user);
    window.location.href = '/profile';
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'An unexpected error occurred';

    // Set local state with error message
    this.setState({ message: errorMsg });
    
      Swal.fire({
        title: "Warning",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    
  }
  render() {
    
    //if logged in redirect to profile
    // if(this.state.loggedIn){
    //   return window.location.href='/profile'
    // }
    
    if(localStorage.getItem('token')){
      return window.location.href='/profile' 
    }
    
    return (
      <div className='login_container'>
          <div className='login_container login'>
          <div className="login_form mt-4">
              <h3 className='login_title'>Login</h3>
              <form onSubmit={this.formSubmit}>
                  <div className="mb-3">
                      <label>Email address</label>
                      <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          required
                          autoComplete='off'
                          onChange={(e)=> {this.setState({email:e.target.value})}}
                      
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
                          onChange={(e)=> {this.setState({password:e.target.value})}}
                      
                      />
                  </div>
                  <p className="forgot-password text-right">
                      <Link to="/forget">Forgot password?</Link>
                  </p>
                  
                  <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-block">Login</button>
                  </div>
                  
              </form>
          </div>
          </div>
        
      </div>
    )
  }
}

export default Login
