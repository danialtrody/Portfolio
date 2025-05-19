import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    image: '',
    date: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching the data: ', error));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/projects', formData)
      .then(response => {
        setProjects(prev => [...prev, response.data]);
        setFormData({ title: '', description: '', technologies: '', github: '', demo: '', image: '', date: '' });
      })
      .catch(error => console.error('Error adding project: ', error));
  };

  return (
    <div className="container mt-4">

      {/* Project Form */}
      <div className="mb-5">
        <h3>Add New Project</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input className="form-control mb-2" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <input className="form-control mb-2" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma-separated)" />
          <input className="form-control mb-2" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL"  />
          <input className="form-control mb-2" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL or filename" />
          <button type="submit" className="btn btn-primary">Add Project</button>
        </form>
      </div>

      {/* Projects Display */}
      <div className="row">
        {projects.map(project => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card mb-3">
              <h4 className="card-header">{project.title}</h4>
              {project.image ? (
                <img src={project.image} alt={project.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{ fontSize: '1.125rem', textAnchor: 'middle' }}>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                  <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
              )}
              <div className="card-body">
                <h6 className="card-subtitle text-muted">
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies || 'Technologies used'}
                </h6>
                <p className="card-text">{project.description}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link">GitHub</a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="card-link">Live Demo</a>
                )}
              </div>
              <div className="card-footer text-muted">
                {project.date || '1 month ago'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
