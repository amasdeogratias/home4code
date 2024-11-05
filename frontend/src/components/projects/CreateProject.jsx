import React, { useState } from 'react'
import { FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CiCirclePlus } from 'react-icons/ci';
import { FcCancel } from "react-icons/fc";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateProject(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        due_date: '',
        status: '',
        image_path: '',
        created_by: props.user.id,
        updated_by: props.user.id
    });

    if (!localStorage.getItem('token')) {
        navigate('/sign-in');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDescriptionChange = (value) => {
        setFormData({
            ...formData,
            description: value
        });
    };

    const modules = {
        toolbar: [
          [{'header':[1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'ident': '-1'}, {'ident': '+1'}],
          ['link', 'image'],
          ['clean']
        ]
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike','blockquote',
        'list', 'bullet', 'indent', 'link', 'image'
      ];

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append other fields
        for (const [key, value] of Object.entries(formData)) {
            formDataToSend.append(key, value);
        }

        axios.post('/projects', formDataToSend, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
        })
        .then((response) => {
            setFormData({
                name: '',
                description: '',
                due_date: '',
                status: '',
                image_path: '',
                created_by: props.user.id,
                updated_by: props.user.id
            });
            console.log(response);
            
        })
        .catch((error) => {
            console.log(error);
            
        })
      }


    return (
        <div className="dashboard_container">
            <div className="container">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="row">
                                <div className="col-12 col-xl-12 mb-4 mb-xl-0">
                                    <h3 className="font-weight-bold">Create new project
                                        <Link to="/projects" className="btn btn-success btn-sm btn-rounded" style={{ float: 'right' }}><FaList /> Projects Listing</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h4>Added successfully</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="title" className='mt-1'>Name</label>
                                                <input type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control mt-1"
                                                    placeholder="Enter Project Name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description" className='mt-1'>description</label>
                                                <ReactQuill 
                                                    modules={modules} 
                                                    formats={formats} 
                                                    value={formData.description} 
                                                    onChange={handleDescriptionChange}
                                                />
                                            </div>

                                            <div className="form-group col-md-6 mt-4">
                                                <label htmlFor="image_path">Image</label>
                                                <input type="file" 
                                                    name="image_path" 
                                                    id="image_path" 
                                                    className='form-control' 
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, image_path: e.target.files[0] }))} 
                                                 />
                                            </div>
                                            <div className="form-group col-md-6 mt-4">
                                                <label htmlFor="due_date">Due Date</label>
                                                <input type="date" name="due_date" id="due_date" className='form-control' value={formData.due_date} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-6 mt-4">
                                                <label htmlFor="status">Status</label>
                                                <select name="status" id="status" className='form-control' value={formData.status} onChange={handleInputChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group mt-2" style={{float:'right'}}>
                                            <Link to={`/projects`} className='btn btn-warning'> <FcCancel /> Cancel</Link>&nbsp;
                                            <button  type="submit" className='btn btn-primary'> <CiCirclePlus /> Add Project</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProject
