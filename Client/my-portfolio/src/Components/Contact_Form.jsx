import React from "react";

export default function ContactForm({ formData, setFormData, handleSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="Formcontainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Your name..."
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Your last name..."
        />

      <label htmlFor="lname">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email..."
        />

        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select a country</option>
          <option value="israel">Israel</option>
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>

        <label htmlFor="subject">Subject</label>
        <textarea
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Write something..."
          style={{ height: '200px' }}
        ></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
