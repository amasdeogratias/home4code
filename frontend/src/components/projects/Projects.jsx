import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import './project.css';
import Pagination from '../Pagination';


function Projects() {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 8;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchProjects = () => {
      setIsLoading(true);
      axios.get('/projects')
      .then(response => {
        setProjects(response.data);
        setIsLoading(false);
        console.log(response.data)
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setError(error);
        
      })
    };
    fetchProjects();
  },[])

  if(!localStorage.getItem('token')){
    return window.location.href='/sign-in' 
}
  

  return (
    <div className='dashboard_container'>
      <div className="container">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">Projects
                    <Link to="/project/create" className="btn btn-success btn-sm btn-rounded" style={{ float: 'right' }}><CiCirclePlus /> Add Project</Link>
                  </h3>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-header">
                      <h3 className='card-title'>List of Projects</h3>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-striped" id='example1'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {isLoading && <div className='loader'></div>}
                        {error && <tr>Something happened, try again later</tr>}
                          {currentProjects.map((project, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{project.name}</td>
                                <td>{project.description}</td>
                                <td>{project.due_date}</td>
                                <td>{project.status}</td>
                                <td>{project.created_by.name }</td>
                                <td>
                                  <Link className='btn btn-primary btn-sm'> <FaEdit /> </Link>
                                  <Link className='btn btn-danger btn-sm'> <FaTrash /> </Link>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
