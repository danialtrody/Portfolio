import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [Home, setHome] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/home')
      .then(response => {
        setHome(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);



  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {Home.map( home => (
          <li key={home.id}>
            <p>{home.about}</p>
          </li>
        ))}
      </ul>
      
    <img src= "https://verpex.com/assets/uploads/images/blog/How-to-become-a-Backend-Developer.jpg?v=1665484477" width = "200"></img>
    </div>
  );
}
