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
            <div className="card text-white bg-primary" style={{ maxWidth: '20rem' }}>
              <div className="card-header">Project {project.id}</div>
              <div className="card-body">
                <h4 className="card-title">{project.title}</h4>
                <p className="card-text">{project.description}</p>
                <p className="card-technologies">
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies}
                </p>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                  View on GitHub
                </a>
                <div className="mt-2">
                  <img src={project.image} alt={project.title} className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
