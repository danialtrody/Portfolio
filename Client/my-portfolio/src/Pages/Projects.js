import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';

// Base URL for API requests
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com";

export default function Projects() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', github: '', image: ''
  });
  const [editingId, setEditingId] = useState(null);


  // Fetch projects once on component mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching:', err));
  }, []);


  // Handle changes in form inputs, update formData state accordingly
  const handleChange = e => setFormData(prev => ({
    ...prev, [e.target.name]: e.target.value
  }));

  // Handle form submission for adding or updating a project
  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_BASE_URL}/api/projects/${editingId}`, formData)
        .then(res => {
          setProjects(prev => prev.map(p => p.id === editingId ? res.data : p));
          setEditingId(null); // Clear editing mode
          resetForm();
        })
        .catch(err => console.error('Update error:', err));
    } else {
      axios.post(`${API_BASE_URL}/api/projects`, formData)
        .then(res => {
          setProjects(prev => [...prev, res.data]); // Add new project to list
          resetForm();
        })
        .catch(err => console.error('Add error:', err));
    }
  };

  // Handle deleting a project by id, with user confirmation
  const handleDelete = id => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    axios.delete(`${API_BASE_URL}/api/projects/${id}`)
      .then(() => setProjects(prev => prev.filter(p => p.id !== id)))
      .catch(err => console.error('Delete error:', err));
  };

  // Populate form with project data for editing
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
    setEditingId(project.id); // Set editing mode
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for form visibility
  };

  // Reset form to empty fields
  const resetForm = () => setFormData({
    title: '', description: '', technologies: '', github: '', image: ''
  });

  // Get unique technologies from all projects for filter buttons
  const uniqueTechnologies = Array.from(new Set(
    projects.flatMap(p =>
      typeof p.technologies === 'string'
        ? p.technologies.split(',').map(t => t.trim())
        : Array.isArray(p.technologies)
          ? p.technologies
          : []
    )
  ));

  // Filter projects based on selected technologies (all selected techs must be present)
  const filteredProjects = selectedTechs.length === 0
    ? projects
    : projects.filter(p => {
        const techArray = typeof p.technologies === 'string'
          ? p.technologies.split(',').map(t => t.trim())
          : Array.isArray(p.technologies)
            ? p.technologies
            : [];
        return selectedTechs.every(t => techArray.includes(t));
      });

  // Render technology filter buttons UI
  const renderTechFilter = () => (
    <div className="mb-4">
      <label className="form-label fw-bold d-block mb-2">Filter by Technologies:</label>
      <div className="d-flex flex-wrap gap-2">
        {uniqueTechnologies.map(tech => {
          const isActive = selectedTechs.includes(tech);
          return (
            <button
              key={tech}
              type="button"
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                setSelectedTechs(prev =>
                  prev.includes(tech)
                    ? prev.filter(t => t !== tech) // Remove tech if already selected
                    : [...prev, tech]             // Add tech if not selected
                );
              }}
            >
              {tech}
            </button>
          );
        })}
        {selectedTechs.length > 0 && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setSelectedTechs([])} // Clear all filters
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {isAdmin && (
        <>
          {/* Form header changes depending on add or edit mode */}
          <h3 className='project-form-header'>{editingId ? 'Edit Project' : 'Add New Project'}</h3>

          {/* Project add/edit form */}
          <form onSubmit={handleSubmit}>
            {['title', 'description', 'technologies', 'github', 'image'].map(name => (
              <input
                key={name}
                className="form-control mb-2"
                name={name}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                value={formData[name]}
                onChange={handleChange}
                required={name === 'title' || name === 'description'} // Title and description required
              />
            ))}

            {/* Submit and cancel buttons */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {editingId ? 'Update' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); resetForm(); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          <hr />
        </>
      )}

      {/* Technology filter buttons */}
      {renderTechFilter()}

      {/* Display filtered project cards */}
      <div className="row">
        {filteredProjects.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}




// Individual Project card component
function ProjectCard({ project, onEdit, onDelete, isAdmin }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">

        {/* Project title */}
        <h4 className="card-header">{project.title}</h4>

        {/* Project image or placeholder */}
        {project.image ? (
          <img src={project.image} alt={project.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
        ) : (
          <div className="card-img-top text-center bg-secondary text-white py-5">No Image</div>
        )}

        <div className="card-body">
          {/* Technologies used */}
          <h6 className="text-muted">
            {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
          </h6>

          {/* Project description */}
          <p>{project.description}</p>

          {/* GitHub link */}
          <a href={project.github} className="card-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          {/* Display updated or created date if available */}
          <small className="text-muted">
            {project.updated_at
              ? `Updated: ${new Date(project.updated_at).toLocaleString()}`
              : project.created_at
                ? `Created: ${new Date(project.created_at).toLocaleString()}`
                : 'Date N/A'}
          </small>

          {/* Edit and Delete buttons visible only to admin */}
          {isAdmin && (
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(project)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(project.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div> 
  );
}
