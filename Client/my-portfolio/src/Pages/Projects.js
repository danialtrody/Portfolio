import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 'http://localhost:5000'
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com"



export default function Projects() {
  const [projects, setProjects] = useState([]); // Holds all project data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null); // Tracks which project is being edited

  // 🔁 useEffect - Runs on component mount to fetch projects from the server
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching the data: ', error));
  }, []);

  // 🖋️ Updates form input fields
  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ➕ Submits the form - adds new project or updates existing
  const handleSubmit = e => {
    e.preventDefault();

    if (editingId) {
      // If editing: send PUT request
      axios.put(`${API_BASE_URL}/api/projects/${editingId}`, formData)
        .then(response => {
          setProjects(prev =>
            prev.map(p => (p.id === editingId ? response.data : p))
          );
          setEditingId(null);
          resetForm();
        })
        .catch(error => console.error('Error updating project: ', error));
    } else {
      // If adding: send POST request
      axios.post(`${API_BASE_URL}/api/projects`, formData)
        .then(response => {
          setProjects(prev => [...prev, response.data]);
          resetForm();
        })
        .catch(error => console.error('Error adding project: ', error));
    }
  };

  // 🗑 Deletes a project by ID
  const handleDelete = id => {
    axios.delete(`${API_BASE_URL}/api/projects/${id}`)
      .then(() => {
        setProjects(prev => prev.filter(p => p.id !== id));
      })
      .catch(err => console.error('Error deleting project:', err));
  };

  // ✏️ Loads project data into the form for editing
  const handleEdit = project => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies || '',
      github: project.github || '',
      image: project.image || '',
    });
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  // 🔁 Resets the form to default state
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github: '',
      image: '',
    });
  };

  return (
    <div className="container mt-4">
      {/* === Project Form === */}
      <div className="mb-5">
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input className="form-control mb-2" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <input className="form-control mb-2" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma-separated)" />
          <input className="form-control mb-2" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" />
          <input className="form-control mb-2" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />


          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">{editingId ? 'Update' : 'Add Project'}</button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); resetForm(); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* === Projects Display === */}
      <div className="row">
        {projects.map(project => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card shadow-sm">
              <h4 className="card-header">{project.title}</h4>
              {project.image ? (
                <img src={project.image} alt={project.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              ) : (
                <div className="card-img-top text-center bg-secondary text-white py-5">No Image</div>
              )}
              <div className="card-body">
                <h6 className="text-muted">
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies}
                </h6>
                <p>{project.description}</p>
                <a href={project.github} className="card-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                {project.demo && (
                  <a href={project.demo} className="card-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                )}
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
              <small className="text-muted">
                  {project.updatedAt 
                    ? `Updated: ${new Date(project.updatedAt).toLocaleString()}` 
                    : project.createdAt
                    ? `Created: ${new Date(project.createdAt).toLocaleString()}`
                    : 'Date not provided'}
               </small>   
                  <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
