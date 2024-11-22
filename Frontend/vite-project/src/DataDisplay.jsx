import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataDisplay() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/getdata')
      .then((response) => {
        setData(response.data.data); // Set the fetched data to state
      })
      .catch((error) => {
        setMessage('Error fetching data.');
      });
  }, []);

  return (
    <div className="container">
      <h2 className="my-3">User Data</h2>
      {message && <p>{message}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((client, index) => (
              <tr key={index}>
                <td>{client.username}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
