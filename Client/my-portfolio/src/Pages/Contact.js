import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from "../Components/Contact_Form";
import "../Components/Contact_Form_Style.css";



// const API_BASE_URL = 'http://localhost:5000'
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com"

export default function Contact() {
  const [contactData, setContactData] = useState([]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    subject: ""
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/contact`)
      .then(response => {
        setContactData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
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

      <div className='contact-page'>
        <ContactForm 
          formData={formData} 
          setFormData={setFormData} 
          handleSubmit={handleSubmit} 
        />

        <ul className='ulContact'>
          <div className='contact-info'>
            {contactData.map(contact => (
              <li key={contact.id || contact.email} style={{ marginBottom: '2rem' }}>
                <h2>{contact.name || `${contact.firstname} ${contact.lastname}`}</h2>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Location:</strong> {contact.location || contact.country}</p>
                {contact.linkedin && (
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                      {contact.linkedin}
                    </a>
                  </p>
                )}
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
