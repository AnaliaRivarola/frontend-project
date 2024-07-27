import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectList from './ProjectList';
import '../styles/kanban.css';

const Main = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);
  
  const handleAddProject = (newProject) => {
    axios.post('http://localhost:8000/api/projects', newProject)
      .then(response => {
        setProjects([...projects, response.data]);
      })
      .catch(error => console.error('Error adding project:', error));
  };
  
  const handleUpdateProject = (id, updatedData) => {
    axios.put(`http://localhost:8000/api/projects/${id}/${updatedData.status}`)
      .then(response => {
        const updatedProjects = projects.map(project =>
          project._id === id ? response.data : project
        );
        setProjects(updatedProjects);
      })
      .catch(error => console.error('Error updating project:', error));
  };
  
  const handleRemoveProject = (id) => {
    axios.delete(`http://localhost:8000/api/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project._id !== id));
      })
      .catch(error => console.error('Error removing project:', error));
  };
  

  return (
    <div className="main-container">
      <h1 className="main-title">Project Manager</h1>
      <ProjectList
        projects={projects}
        onUpdateProject={handleUpdateProject}
        onRemoveProject={handleRemoveProject}
      />
      <Link to="/add-project">
        <button className="add-project-button">Add New Project</button>
      </Link>
    </div>
  );
};

export default Main;
