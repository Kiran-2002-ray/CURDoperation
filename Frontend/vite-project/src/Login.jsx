import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // useNavigate for routing in v6
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login API
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      setMessage(response.data.message); // Set the message
      localStorage.setItem('token', response.data.token); // Store the token
      setShowPopup(true); // Show the popup on successful login

      // Navigate to the dashboard after a delay (2 seconds)
      setTimeout(() => {
        navigate('/datadisplay');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setShowPopup(true); // Show the popup on error
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="popup-close" onClick={closePopup}>
              &times;
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100 rounded-0" type="submit">
            <strong>Log in</strong>
          </button>

          <p>You agree to our terms and policies</p>

          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
