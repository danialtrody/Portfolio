import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 

// const API_BASE_URL = "https://portfolio-0rl4.onrender.com"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { setIsAdmin } = useAuth();

  // Function to handle admin login with email and password
  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      // Send POST request to backend API with email and password

      if (res.data.success) {
        setIsAdmin(true);
        alert('Logged in as Admin!');
        navigate('/home');
      } else {
        setErrorMsg('Invalid credentials');
      }
    } catch {
      setErrorMsg('Login failed');
    }
  };

  // Function to handle guest login (no email/password needed)
  const handleGuestLogin = () => {
    setIsAdmin(false);
    alert('Logged in as Guest!');
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-4" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Email input field */}
        <div className="mb-3 row">
          <label htmlFor="emailInput" className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
        </div>

        {/* Password input field */}
        <div className="mb-3 row">
          <label htmlFor="passwordInput" className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Display error message if any */}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {/* Login buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleAdminLogin}>Login as Admin</button>
          <button className="btn btn-outline-secondary" onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
      </div>
    </div>
  );
}
