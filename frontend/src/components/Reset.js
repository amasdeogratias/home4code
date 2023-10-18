import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Reset extends Component {
  
  state = {
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
    message: ''
  }
  
  resetPassword = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      token: this.state.token,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    axios.post('/reset_password', data)
    .then(response => {
      this.setState({message: response.data.message});
      document.getElementById("resetForm").reset();
    })
    .catch(error => {
      this.setState({message: error.response.data.message});
    });
  }
  render() {
    
    let error = "";
    if(this.state.message){
      error = (
            <div>
                <div className="alert alert-danger" role='alert'>
                    {this.state.message}
                </div>
            </div>
      )
    }
    return (
      <div className="row mt-4">
        <div className='jumbotron col-lg-4 offset-lg-4'>
                <h3 className='text-center'>Reset Password</h3>
                <form onSubmit={this.resetPassword} id='resetForm'>
                    <h3 className="error"> { error } </h3> 
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                            onChange={(e)=> {this.setState({email:e.target.value})}}
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label>Token</label>
                        <input
                            type="text"
                            name="token"
                            className="form-control"
                            placeholder="Enter token"
                            required
                            onChange={(e)=> {this.setState({token:e.target.value})}}
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter new password"
                            required
                            onChange={(e)=> {this.setState({password:e.target.value})}}
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            className="form-control"
                            placeholder="Enter password"
                            required
                            onChange={(e)=> {this.setState({password_confirmation:e.target.value})}}
                        
                        />
                    </div>
                    <p className="forgot-password text-right">
                         <Link to="/sign-in">Login</Link>
                    </p>
                    
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                    </div>
                    
                </form>
            </div>
      </div>
    )
  }
}

export default Reset
