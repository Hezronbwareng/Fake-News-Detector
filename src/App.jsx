// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css'; // Import app.css

function App() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [fakeNewsResult, setFakeNewsResult] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const simulateApiCall = async () => {
    setProcessing(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a delay
    setProcessing(false);
    setFakeNewsResult('Fake news detected!'); // Mock result
  };

  const simulateRegenerateApiCall = async () => {
    setProcessing(true);
    // Simulate API call to regenerate data
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a delay
    setProcessing(false);
    setFakeNewsResult('Regenerated fake news data!'); // Mock result
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim() !== '') {
      setChatHistory((prevHistory) => [...prevHistory, { type: 'user', text: inputText }]);
      simulateApiCall();
      setInputText('');
    }
  };

  const handleRegenerate = () => {
    simulateRegenerateApiCall();
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setFakeNewsResult('');
  };

  // eslint-disable-next-line no-unused-vars
  const handleFeedback = (isHelpful) => {
    if (isHelpful) {
      setFeedbackMessage('Thank you for your feedback! We aim to improve.');
    } else {
      setFeedbackMessage('We appreciate your feedback. We will work on improving our system.');
    }
  };

  useEffect(() => {
    if (feedbackMessage) {
      setTimeout(() => {
        setFeedbackMessage('');
      }, 3000); // Display feedback message for 3 seconds
    }
  }, [feedbackMessage]);

  return (
    <div className="App">
      <div className="chat-container">
        <h1 className="app-title">Fakeout - Fake News Detector</h1>
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index} className={message.type === 'user' ? 'user-bubble' : 'response-bubble'}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            placeholder="Enter news for analysis"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button className="send" onClick={handleSubmit}>Send</button>
            <button className="regenerate" onClick={handleRegenerate}>Regenerate</button>
            <button className="clear-chat" onClick={handleClearChat}>Clear Chat</button>
          </div>
        </div>
        {processing && <p className="processing-indicator">Processing...</p>}
        {fakeNewsResult && <div className="response-bubble">{fakeNewsResult}</div>}

        <div>
        <div className="user-feedback">
          <p>Was this helpful?</p>
          <button onClick={() => handleFeedback(true)}>Yes</button>
          <button onClick={() => handleFeedback(false)}>No</button>
        </div>
        </div>
        {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
      </div>
    </div>
  );
}

export default App;
