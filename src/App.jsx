// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import app.css
import './index.css'; // Import index.css

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://your-api-endpoint', { text: inputText });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRegenerate = () => {
    setInputText('');
    setResult('');
  };

  const handleClearChat = () => {
    setInputText('');
    setResult('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="input-container">
          <textarea
            placeholder="Enter text for analysis"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button onClick={handleSubmit}>Detect </button>
            <button onClick={handleRegenerate}>Regenerate</button>
            <button onClick={handleClearChat}>Clear Chat</button>
          </div>
        </div>
        {result && (
          <div className="result-container">
            <h2>Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
