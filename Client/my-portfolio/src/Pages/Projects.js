import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {projects.map(project => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card mb-3">
              <h4 className="card-header">{project.title}</h4>
              <div className="card-body">
              </div>

              {/* Image or Placeholder */}
              {project.image ? (
                <img src={project.image} alt={project.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{ fontSize: '1.125rem', textAnchor: 'middle' }}>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                  <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
              )}

              <div className="card-body">
              <br></br>
              <h6 className="card-subtitle text-muted">
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies || 'Technologies used'}
                </h6>
                <br></br>
                <p className="card-text">{project.description}</p>
              </div>

       

              <div className="card-body">
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
