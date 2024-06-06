import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict');
        const data = await response.json();
        console.log(data);
        setPrediction(data.prediction); // Update to match the correct key
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    };

    fetchPrediction(); // Fetch initially

    const intervalId = setInterval(fetchPrediction, 1000); // Fetch every second

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <div className="App">

      <main>
        <div className="video-container">
          <img src="http://127.0.0.1:5000/video_feed" alt="video feed" />
        </div>
        <div className="prediction">
          <p>Prediction: {prediction}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
