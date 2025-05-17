import React , {useEffect, useState}from 'react';
import axios from 'axios'


export default function Projects() {

  const [Projects, setProjects] = useState([])

  useEffect( ()=> {
    axios.get('http://localhost:5000/api/projects')
         .then(response => {
          setProjects(response.data);
         })
         .catch(error => {
          console.error('Error fetchig the fata: ',error);
         })

  },[]);

  return (
    <div>
      <div className="container mt-4">
      <div className="row">
        {Projects.map(project => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card text-white bg-primary" style={{ maxWidth: '20rem' }}>
              <div className="card-header">Project {project.id}</div>
              <div className="card-body">
                <h4 className="card-title">{project.title}</h4>
                <p className="card-text">{project.description}</p>
                <p className="card-technologies">{project.technologies}</p>
                <p className="card-github">{project.github}</p>
                <p className="card-image">{project.image}</p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}