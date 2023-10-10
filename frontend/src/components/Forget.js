import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Forget extends Component {
  render() {
    return (
        <div>
            <div className="row mt-4">
                <div className='jumbotron col-lg-4 offset-lg-4'>
                    <h3 className='text-center'>Forget Password?</h3>
                    <form>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Send Email</button>
                        </div>
                        <p className="forgot-password text-right">
                           Don't have account <Link to="/sign-up">sign up here?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default Forget
