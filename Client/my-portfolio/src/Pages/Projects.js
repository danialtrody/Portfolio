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
      <h1>Project Page</h1>
      <ul>
        {Projects.map( project => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}