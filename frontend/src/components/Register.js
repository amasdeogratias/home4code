import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Register</h3>
          <form>
      <div className="mb-3">
        <label>Full name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
        />
      </div>
      
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password confirmation"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <Link to="/sign-in">sign in?</Link>
      </p>
    </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
