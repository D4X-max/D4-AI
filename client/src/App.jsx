// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css'; // Assuming you have this file from the starter

function App() {
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    // The URL of our backend server's endpoint
    const backendUrl = 'http://localhost:8080/';

    fetch(backendUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setServerMessage(data.message);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setServerMessage('Failed to connect to the server.');
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <h1>MERN AI Image Generator</h1>
      <p>
        <strong>Status:</strong> {serverMessage}
      </p>
    </>
  );
}

export default App;
