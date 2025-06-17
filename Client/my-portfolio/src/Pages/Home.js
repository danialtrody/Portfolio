import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

// Default API URL points to the Render server deployment
let API_BASE_URL = "https://portfolio-6-5icm.onrender.com";

// Attempt to ping the local backend server and switch to it if available
await fetch("http://localhost:5000/ping")
  .then((res) => {
    if (res.ok) {
      API_BASE_URL = "http://localhost:5000"; // Use local server if reachable
    }
  })
  .catch(() => {
  });

export default function Home() {
  // State to hold home page data: [carouselItems, teamMembers]
  const [homeData, setHomeData] = useState([[], []]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/home`)
      .then(response => setHomeData(response.data)) 
      .catch(error => console.error('Error fetching the data:', error)); 
  }, []);

  return (
    <div className="container mt-5">
      <Carousel>
        {homeData[0]?.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index}`}
              style={{ maxHeight: '450px', objectFit: 'cover', borderRadius: '10px' }}
            />
            {/* Carousel caption overlay with a semi-transparent background */}
            <Carousel.Caption>
              <h3 className="bg-dark bg-opacity-50 p-2 rounded">{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* --- Team Section --- */}
      <h2 className="text-center mt-5 mb-4">Meet Our Team</h2>
      <div className="row justify-content-center">
        {/* Map over the second element of homeData assumed to be team members */}
        {homeData[1]?.map((member, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={member.id || index}>
            <div className="card h-100 shadow border-0">
              <div className="card-body text-center">
                {/* Team member avatar with fixed size and rounded style */}
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/024/101/180/small/mysterious-man-wearing-black-hoodie-standing-against-dark-background-hacker-crime-and-cyber-security-concept-photo.jpg"
                  alt={member.name}
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #ccc" }}
                />
                {/* Member name */}
                <h4 className="card-title">{member.name}</h4>
                {/* Member about description */}
                <p className="text-muted mb-2">{member.about}</p>
                {/* Member skills, joined if array */}
                <p><strong>Skills:</strong> {
                  Array.isArray(member.skills)
                    ? member.skills.join(', ')
                    : member.skills
                }</p>
                {/* Member interests, joined if array */}
                <p><strong>Interests:</strong> {
                  Array.isArray(member.interests)
                    ? member.interests.join(', ')
                    : member.interests
                }</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
