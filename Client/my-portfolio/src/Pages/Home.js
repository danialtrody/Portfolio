import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

// 'http://localhost:5000'
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com"


export default function Home() {
  const [homeData, setHomeData] = useState([[], []]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/home`)
      .then(response => setHomeData(response.data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  return (
    <div className="container mt-5">
      {/* --- Carousel Section --- */}
      <Carousel>
        {homeData[0]?.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index}`}
              style={{ maxHeight: '450px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <Carousel.Caption>
              <h3 className="bg-dark bg-opacity-50 p-2 rounded">{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* --- Team Section --- */}
      <h2 className="text-center mt-5 mb-4">Meet Our Team</h2>
      <div className="row justify-content-center">
        {homeData[1]?.map((member, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={member.id || index}>
            <div className="card h-100 shadow border-0">
              <div className="card-body text-center">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/024/101/180/small/mysterious-man-wearing-black-hoodie-standing-against-dark-background-hacker-crime-and-cyber-security-concept-photo.jpg"
                  alt={member.name}
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #ccc" }}
                />
                <h4 className="card-title">{member.name}</h4>
                <p className="text-muted mb-2">{member.about}</p>
                <p><strong>Skills:</strong> {member.skills?.join(', ')}</p>
                <p><strong>Interests:</strong> {member.interests?.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
