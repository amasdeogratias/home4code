import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// import login and sign up components
import Login from './components/Login';
import Register from './components/Register';
import Home from './common/Home'
import Navbar from './components/Navbar'
import Forget from './components/Forget'
import Profile from './components/Profile'
import Reset from './components/Reset'
import Task from './components/Task'
import axios from 'axios'


class App extends Component {
  
  state = {
    user: {}
  }
  
  componentDidMount() {
    axios.get('/login-user')
    .then((response) => {
      this.setUser(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  setUser = (user) => {
    this.setState({
      user:user
    });
  }
  
  
  
  
  render() {
    return (
      <>
        <Router>
        <Navbar user = {this.state.user} setUser={this.setUser}/>
          <div className="App">
            
            <div className="auth-wrapper">
              
                <Routes>
                  <Route exact path="/" element= {<Home />}/>
                  <Route exact path="/sign-in" element= {<Login user = {this.state.user} setUser={this.setUser} />}/>
                  <Route exact path="/sign-up" element= {<Register user = {this.state.user} setUser={this.setUser}/>}/>
                  <Route exact path="/forget" element= {<Forget/>}/>
                  <Route exact path="/reset/:id" element= {<Reset/>}/>
                  <Route exact path="/profile" element= {<Profile user = {this.state.user}/>}/>
                  <Route exact path="/tasks" element = {<Task />}/>
                </Routes>
              </div>
            
          </div>
        </Router>
      </>
    )
  }
}



export default App;
