import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Styles/signup.css"

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // Store the message to display in the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        username: name, // Match the backend field "username"
        email,
        password,
        phone,
      });
      setPopupMessage(response.data.message); // Set the message to display
      setIsPopupVisible(true); // Show the popup
    } catch (error) {
      setPopupMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      ); // Set error message if the request fails
      setIsPopupVisible(true); // Show the popup
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      {/* Popup Window */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-window">
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="btn btn-secondary">Close</button>
          </div>
        </div>
      )}

      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control rounded-0"
              name="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              name="email"
              autoComplete="off"
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
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone No.</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="form-control rounded-0"
              name="phone"
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Link to="/" className="btn btn-success w-100 rounded-0" type="submit">
            <strong>Sign up</strong>
          </Link>
          <p>You agree to our terms and policies</p>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Log in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
