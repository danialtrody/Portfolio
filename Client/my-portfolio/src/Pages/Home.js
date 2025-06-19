import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

// let API_BASE_URL = 'https://portfolio-6-5icm.onrender.com';
let API_BASE_URL = 'http://localhost:5000'


export default function Home() {
  // State to hold home page data: [carouselItems, teamMembers]
  const [homeData, setHomeData] = useState([[], []]); // media, users
  const [icons, setIcons] = useState([]); // tech icons

  useEffect(() => {
    // Fetch home content
    axios.get(`${API_BASE_URL}/api/home`)
      .then(response => setHomeData(response.data))
      .catch(error => console.error('Error fetching home data:', error));

    // Fetch tech icons
    axios.get(`${API_BASE_URL}/api/icons`)
      .then(response => setIcons(response.data))
      .catch(error => console.error('Error fetching icons:', error));
  }, []);

  return (
    <>
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
    <h2 className="text-center mt-5 mb-4">Technologies We Use</h2>
<div className="d-flex flex-wrap justify-content-center gap-4 mb-5">
  {icons.map(icon => (
    <div
      key={icon.id}
      className="text-center p-3 rounded shadow-sm"
      style={{
        width: '120px',
        backgroundColor: '#f8f9fa',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: '1px solid #e0e0e0',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
      }}
    >
      <img
        src={icon.icon}
        alt={icon.name}
        style={{ width: '64px', height: '64px', objectFit: 'contain' }}
      />
      <p className="mt-2 mb-0" style={{ fontWeight: '500' }}>{icon.name}</p>
    </div>
  ))}
</div>


</>
  );
}
