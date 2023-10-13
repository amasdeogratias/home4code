import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  }
  
  formSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      console.log(response);
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
    
    //if logged in redirect to profile
    if(this.state.loggedIn){
      return window.location.href='/profile'
    }
    
    return (
      <div>
        <div className="row mt-4">
            <div className='jumbotron col-lg-4 offset-lg-4'>
                <h3 className='text-center'>Login</h3>
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
