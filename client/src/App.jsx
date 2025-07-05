// client/src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setLoading(true);
    setImageUrl('');
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image. Please try again.');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Image Generator with MERN & Hugging Face</h1>
      <p>Enter a prompt and watch the AI bring your idea to life. Powered by Stable Diffusion.</p>
      
      <form onSubmit={handleSubmit} className="image-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A photo of an astronaut riding a horse on Mars"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="image-display-area">
        {loading && (
          <div className="loading-indicator">
            <p>Creating your masterpiece... please wait.</p>
            <div className="spinner"></div>
          </div>
        )}
        
        {imageUrl && !loading && (
          <div className="generated-image-container">
            <h2>Your Generated Image:</h2>
            <img src={imageUrl} alt={`Generated from prompt: ${prompt}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

