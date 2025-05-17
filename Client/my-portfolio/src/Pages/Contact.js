import React , {useEffect, useState}from 'react';
import axios from 'axios'


export default function Contact() {

  const [Contact, setContact] = useState([])

  useEffect( ()=> {
    axios.get('http://localhost:5000/api/contact')
         .then(response => {
          setContact(response.data);
         })
         .catch(error => {
          console.error('Error fetchig the fata: ',error);
         })
  },[]);


  return (
    <div>
      <h1>Contact Page</h1>
      <ul>
        {Contact.map( contact => (
          <li key={contact.id}>
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}