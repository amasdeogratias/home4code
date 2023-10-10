import React, {useEffect, useState, Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// import login and sign up components
import Login from './components/Login';
import Register from './components/Register';
import Home from './common/Home'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <>
        <Router>
        <Navbar />
          <div className="App">
            
            <div className="auth-wrapper">
              
                <Routes>
                  <Route exact path="/" element= {<Home />}/>
                  <Route exact path="/sign-in" element= {<Login />}/>
                  <Route exact path="/sign-up" element= {<Register />}/>
                  <Route exact path="/forget"/>
                </Routes>
              </div>
            
          </div>
        </Router>
      </>
    )
  }
}



export default App;
