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
    // <div>
    //   <h1>Home Page</h1>
    //   <ul>
    //     {homeData.map(home => (
    //       <li key={home.id} style={{ marginBottom: '2rem' }}>
 
    //       </li>
    //     ))}
    //   </ul>

    //   <img
    //     src="https://verpex.com/assets/uploads/images/blog/How-to-become-a-Backend-Developer.jpg?v=1665484477"
    //     width="200"
    //     alt="Backend Development"
    //   />
    // </div>


<div className="container mt-4">
      <h1 className="mb-4">About Us</h1>
      <div className="row">
        {Home.map(item => (
          <div className="col-md-6 mb-4" key={item.id}>
            <div className="card shadow-sm">
              <div className="card-body">
              <h2>{item.name}</h2>
            <p><strong>About:</strong> {item.about}</p>
            <p><strong>Skills:</strong> {item.skills?.join(', ')}</p>
            <p><strong>Interests:</strong> {item.interests?.join(', ')}</p>
                <img
            src="https://verpex.com/assets/uploads/images/blog/How-to-become-a-Backend-Developer.jpg?v=1665484477" 
            alt="Backend Development" width="200"
          />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
