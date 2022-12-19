import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  
    // handle form submit
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  const redirect = useNavigate(); //redirect function
  
  //create submit function
  const submit = async (e) => {
    e.preventDefault();
    
    
    
    //define api endpoint for register
     await fetch('http://localhost/laravel-react/backend/public/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name,
        last_name, 
        email,
        password
      })
    });
    
    
    
    //display result/content in the console
    // const content = await response.json();
    // console.log(content)
  }
  redirect('/sign-in'); //redirect to login after submit
  return (
    <form onSubmit={submit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={e=>setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" 
        onChange={e=> setLastName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  )
  
}

export default SignUp;