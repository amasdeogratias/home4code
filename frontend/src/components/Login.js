import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
            <div className='jumbotron col-lg-4 offset-lg-4'>
                <h3 className='text-center'>Login</h3>
                <form>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                        
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
