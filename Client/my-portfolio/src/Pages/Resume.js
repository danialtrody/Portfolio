import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [resume, setresume] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setresume(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
      });
  }, []);

  return (
    <div>

    </div>
  );
}
