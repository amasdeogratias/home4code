import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Forget extends Component {
    
    state = {
        email: '',
        message: ''
    }
    
    forgetPassword = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email
        };
        axios.post('/forget_password', data)
        .then((response) => {
            this.setState({message: response.data.message});
            document.getElementById("forgetForm").reset();
        })
        .catch((error) => {
            this.setState({message: error.response.data.message});
        });
    }
  render() {
    
    //display error msg
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
        <div className='login_container'>
            <div className="row mt-4">
                <div className='jumbotron col-lg-4 offset-lg-4'>
                    <h3 className='text-center'>Forget Password?</h3>
                    <form onSubmit={this.forgetPassword} id='forgetForm'>
                    <h3 className="error"> { error } </h3> 
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                required
                                onChange={(e) => {this.setState({email: e.target.value})}}
                            
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Send Email</button>
                        </div>
                        <p className="forgot-password text-right">
                           Don't have account <Link to="/sign-up" style={{color:'white', textDecoration:'none'}}>sign up here?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default Forget
