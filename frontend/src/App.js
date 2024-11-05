import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import login and sign up components
import Login from './components/Login';
import Register from './components/Register';
import Home from './common/Home'
import Navbar from './components/Navbar'
import Forget from './components/Forget'
import Profile from './components/Profile'
import Reset from './components/Reset'
import Task from './components/tasks/Task'
import CreateTask from './components/tasks/CreateTask'
import EditTask from './components/tasks/EditTask'
import axios from 'axios'
import ViewTask from './components/tasks/ViewTask'
import Projects from './components/projects/Projects'
import CreateProject from './components/projects/CreateProject';


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
        
          <div className="container-scroller">
            <Navbar user = {this.state.user} setUser={this.setUser}/>
                <Routes>
                  <Route exact path="/" element= {<Home />}/>
                  <Route exact path="/sign-in" element= {<Login user = {this.state.user} setUser={this.setUser} />}/>
                  <Route exact path="/sign-up" element= {<Register user = {this.state.user} setUser={this.setUser}/>}/>
                  <Route exact path="/forget" element= {<Forget/>}/>
                  <Route exact path="/reset/:id" element= {<Reset/>}/>
                  <Route exact path="/profile" element= {<Profile user = {this.state.user}/>}/>
                  <Route exact path="/tasks" element = {<Task />}/>
                  <Route exact path="/create-task" element = {<CreateTask />}/>
                  <Route exact path="/edit-task/:task_id" element = {<EditTask/>}/>
                  <Route exact path="/view-task/:task_id" element = {<ViewTask user = {this.state.user}/>}/>
                  <Route exact path="/projects" element = {<Projects user = {this.state.user}/>}/>
                  <Route exact path="/project/create" element = {<CreateProject user={this.state.user} />}/>
                </Routes>
            
          </div>
        </Router>
      </>
    )
  }
}



export default App;
