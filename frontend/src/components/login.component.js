import React, { useState } from 'react'
import Swal from 'sweetalert2'
const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    //define api endpoint for login
    await fetch('http://localhost/laravel-react/backend/public/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials:'include', //get cookie from the backend
      body: JSON.stringify({
        email,
        password
      })
    });
    
    // alert
    Swal.fire({
      title:"Success",
      text: "Login Successfully...",
      icon: "success",
      confirmButtonText: "OK"
    });
  }
  
  return (
    <form onSubmit={handleLogin}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={e=>setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  )

}
export default Login;
