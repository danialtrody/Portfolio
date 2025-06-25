import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from "../Components/Contact_Form";
import "../Components/Contact_Form_Style.css";

// const API_BASE_URL = 'http://localhost:5000';

const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 
// const API_BASE_URL = "https://portfolio-0rl4.onrender.com


export default function Contact() {
  // State to store contact data fetched from backend API
  const [contactData, setContactData] = useState([]);

  // State to manage form input values
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    subject: ""
  });

  // Fetch contact data once when component mounts
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/contact`)
      .then(response => {
        setContactData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching the data: ', error); 
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData); // Send form data to backend
      // Clear form fields after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        country: "",
        subject: ""
      });
    } catch (err) {
      console.error(err); 
      alert('Error saving data'); 
    }
  };

  return (
    <>
      {/* Section with repeated contact header images */}
      <div className='ContactImg'>
        <img
          src="/contactImg.webp"
          alt="Contact"
          className="contact-header-image"
        />
        <img
          src="/contactImg.webp"
          alt="Contact"
          className="contact-header-image"
        />
      </div>

      <h1 className="get-touch">Get touch with us!</h1>
      
      <div className='contact-page'>
        {/* Contact form component with props to control inputs and submission */}
        <ContactForm 
          formData={formData} 
          setFormData={setFormData} 
          handleSubmit={handleSubmit} 
        />

        {/* Display contact information fetched from backend */}
        <ul className='ulContact'>
          <div className='contact-info'>
            {contactData.map(contact => (
              <li key={contact.id || contact.email} style={{ marginBottom: '2rem' }}>
                {/* Display name, fall back to firstname + lastname if name not available */}
                <h2>{contact.name || `${contact.firstname} ${contact.lastname}`}</h2>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Location:</strong> {contact.location || contact.country}</p>
                
                {/* Conditionally render LinkedIn link if exists */}
                {contact.linkedin && (
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                      {contact.linkedin}
                    </a>
                  </p>
                )}

                {/* Conditionally render GitHub link if exists */}
                {contact.github && (
                  <p>
                    <strong>GitHub:</strong>{' '}
                    <a href={contact.github} target="_blank" rel="noopener noreferrer">
                      {contact.github}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}
