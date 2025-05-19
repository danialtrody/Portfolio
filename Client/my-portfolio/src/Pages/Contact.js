import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from "../Components/Contact_Form"
import "../Components/Contact_Form_Style.css"



export default function Contact() {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contact')
      .then(response => {
        setContactData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
      });
  }, []);

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
    <div className='contact-page '>

      <ContactForm />
      
  
      <ul className='ulContact'>
        <div className='contact-info'>
          {contactData.map(contact => (
            <li key={contact.id} style={{ marginBottom: '2rem' }}>
              <h2>{contact.name}</h2>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Location:</strong> {contact.location}</p>
              <p>
                <strong>LinkedIn:</strong>{' '}
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  {contact.linkedin}
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  {contact.github}
                </a>
              </p>
            </li>
          ))}
        </div>
      </ul>
    </div>
  </>
  );
  
}
