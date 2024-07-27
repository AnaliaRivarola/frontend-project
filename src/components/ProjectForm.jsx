import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/kanban.css'; 

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3 || !dueDate) {
      alert('Project name must be at least 3 characters and due date is required');
      return;
    }
    axios.post('http://localhost:8000/api/projects', { name, dueDate })
      .then(response => {
        navigate('/');
      })
      .catch(error => console.error('Error adding project:', error));
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Project</h1>
      <div className="form-link">
        <Link to="/" className="back-link">Back to Project List</Link>
      </div>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
