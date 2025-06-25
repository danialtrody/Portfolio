import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { useAuth } from '../Components/AuthContext'; 


// const API_BASE_URL = 'http://localhost:5000';

const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 
// const API_BASE_URL = "https://portfolio-0rl4.onrender.com


export default function Projects() { 
  const { isAdmin } = useAuth(); 
  const [projects, setProjects] = useState([]); 
  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', github: '', image: ''
  }); 
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`) 
    // Fetch all projects from API on component mount
      .then(res => setProjects(res.data)) 
      .catch(err => console.error('Error fetching:', err)); 
  }, []); 

  const handleChange = e => setFormData(prev => ({
    ...prev, [e.target.name]: e.target.value
  })); 
  // Update formData state when any input changes; maintain other fields unchanged

  const handleSubmit = e => {
    e.preventDefault(); 
    if (editingId) { 
      // If editing an existing project
      axios.put(`${API_BASE_URL}/api/projects/${editingId}`, formData) 
        .then(res => {
          setProjects(prev => prev.map(p => p.id === editingId ? res.data : p)); 
          setEditingId(null); 
          resetForm(); 
        })
        .catch(err => console.error('Update error:', err)); 
    } else { 
      // Adding a new project
      axios.post(`${API_BASE_URL}/api/projects`, formData) 
        .then(res => {
          setProjects(prev => [...prev, res.data]); 
          resetForm(); 
        })
        .catch(err => console.error('Add error:', err)); 
    }
  };

  const handleDelete = id => {
    axios.delete(`${API_BASE_URL}/api/projects/${id}`) 
    // Send DELETE request to remove a project by id
      .then(() => setProjects(prev => prev.filter(p => p.id !== id))) 
      .catch(err => console.error('Delete error:', err)); 
  };

  const handleEdit = project => {
    setFormData({
      title: project.title || '', 
      description: project.description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ') 
        : project.technologies || '',
      github: project.github || '',
      image: project.image || ''
    }); 
    setEditingId(project.id); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const resetForm = () => setFormData({
    title: '', description: '', technologies: '', github: '', image: ''
  }); 

  if (isAdmin) { 
    // Render form and admin controls if user is admin
    return (
      <div className="container mt-4">
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3> 
        {/* Display title based on whether editing or adding */}

        <form onSubmit={handleSubmit}>
          {['title','description','technologies','github','image'].map(name => (
            <input
              key={name}
              className="form-control mb-2"
              name={name}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              value={formData[name]}
              onChange={handleChange}
              required={name === 'title' || name === 'description'} 
              // Title and Description are required fields
            />
          ))}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update' : 'Add Project'} 
              {/* Button text changes based on editing mode */}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); resetForm(); }}>
                Cancel 
                {/* Cancel editing and reset form */}
              </button>
            )}
          </div>
        </form>
        <hr />
        <div className="row">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onEdit={handleEdit} onDelete={handleDelete} isAdmin />
            // Render project cards with admin controls
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} isAdmin={false} />
          // Render project cards without admin controls for normal users
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onEdit, onDelete, isAdmin }) {
  // Component to display individual project details and admin actions if allowed

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <h4 className="card-header">{project.title}</h4> 
        {/* Project title */}

        {project.image ? (
          <img src={project.image} alt={project.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
          // Show project image if available with fixed height and cover style
        ) : (
          <div className="card-img-top text-center bg-secondary text-white py-5">No Image</div>
          // Placeholder if no image exists
        )}

        <div className="card-body">
          <h6 className="text-muted">
            {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
            {/* Show technologies as comma separated list */}
          </h6>
          <p>{project.description}</p> 
          {/* Project description */}
          <a href={project.github} className="card-link" target="_blank" rel="noopener noreferrer">GitHub</a> 
          {/* Link to GitHub repo */}
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {project.updated_at
              ? `Updated: ${new Date(project.updated_at).toLocaleString()}`
              : project.created_at
                ? `Created: ${new Date(project.created_at).toLocaleString()}`
                : 'Date N/A'}
            {/* Display updated or created date, or fallback */}
          </small>

          {isAdmin && (
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(project)}>Edit</button> 
              {/* Edit button for admin */}
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(project.id)}>Delete</button> 
              {/* Delete button for admin */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
