import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'

const EditTask = (props) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { task_id } = useParams();
  
  useEffect(() => {
    fetchdata(task_id);
    setLoading(true)
    fetchUsers();
    
  }, [task_id]);

  const fetchdata = (task_id) => {
    axios
      .get(`/tasks/${task_id}`)
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching task', error);
        setLoading(false);
      });
  };

  const fetchUsers = () => {
    axios
      .get('/users/all')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const renderOption = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
  };
  
  const handleInput = (e) => {
    e.persist();
    setTasks({...tasks, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    const data = {
      title: tasks.title,
        description: tasks.description,
        priority: tasks.priority,
        start_date: tasks.start_date,
        duration: tasks.duration,
        end_date: tasks.end_date,
        user_id: tasks.user_id,
    }
    axios.put(`/tasks/${task_id}`, data)
    .then((res) => {
      setMessage(res.data.message)
    })
    .catch((error) => {
      setMessage(error.response.data.message)
    });
  };

  const style = {
    float: 'right',
  };

  let success = '';
  if (message) {
    success = (
      <div>
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid page-body-wrapper">
      <Sidebar />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">
                    Add Task Details
                    <Link to="/tasks" className="btn btn-success btn-sm btn-rounded" style={style}>
                      <i className="ti-icon ti-list"></i> View Tasks
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
              <span>
                  {loading ? (
                      <span className='alert alert-info'>Loading...</span>
                    ) : null}
                  </span>
                <div className="card-body">
                  <h4 className="text-center">{success}</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <input type="hidden" name="task_id" value={tasks.id} />
                      <div className="form-group col-md-6">
                        <label htmlFor="title">Task Name</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="form-control"
                          placeholder="Enter Task Name"
                          required
                          value={tasks.title}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="title">Assign User</label>
                        <select
                          name="user_id"
                          id="user_id"
                          className="form-control"
                          onChange={handleInput}
                        >
                          <option value="">Select user</option>
                          {renderOption()}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Task description</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="3"
                        className="form-control"
                        value={tasks.description}
                        onChange={handleInput}
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="start_date"></label>
                        <input
                          type="date"
                          name="start_date"
                          id="start_date"
                          className="form-control"
                          placeholder="Enter start date"
                          required
                          value={tasks.start_date}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="end_date"></label>
                        <input
                          type="date"
                          name="end_date"
                          id="end_date"
                          className="form-control"
                          placeholder="Enter end date"
                          required
                          value={tasks.end_date}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="duration"></label>
                        <input
                          type="text"
                          name="duration"
                          id="duration"
                          className="form-control"
                          placeholder="Enter duration"
                          required
                          value={tasks.duration}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-check col-md-6 mt-5">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="priority"
                            value={tasks.priority}
                            onChange={(e) => setTasks(e.target.checked)}
                          />
                          Priority
                        </label>
                      </div>
                    </div>
                    <div className="text-center float-right">
                      <button type="submit" className="btn btn-primary mr-2">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
