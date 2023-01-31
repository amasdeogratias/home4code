import React, {useEffect, useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// import login and sign up components
import Login from './components/login.component';
import SignUp from './components/signup-component';
import Home from './components/home'
import Nav from './components/nav';

function App() {
  const [name, setName] = useState(''); //get authenticated user;
  
  useEffect(() => {
    (
      async() => {
        const response = await fetch('http://localhost/laravel-react/backend/public/api/user',{
          headers: {'Content-Type': 'application/json'},
          credentials: 'include', //get cookie from the backend
        });
        
        const content = await response.json();
        setName(content.name)
      }
    )();
  });
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element= {<Home name={name} />}/>
              <Route exact path="/sign-in" element= {<Login />}/>
              <Route exact path="/sign-up" element= {<SignUp />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
