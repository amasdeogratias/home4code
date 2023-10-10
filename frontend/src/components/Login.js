import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
            <div className='jumbotron col-lg-4 offset-lg-4'>
                <h3 className='text-center'>Login</h3>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        
                        />
                    </div>
                    
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                    <p className="forgot-password text-right">
                         <a href="#">Forgot password?</a>
                    </p>
                </form>
            </div>
           
        </div>
        
      </div>
    )
  }
}

export default Login
