import React, { useState } from 'react';
import axios from 'axios';

function AverageCalculator() {
  const [numbers, setNumbers] = useState([]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async (numberId) => {
    try {
      const response = await axios.get(`http://localhost:5000/numbers/${numberId}`);
      const { windowPrevState, windowCurrState, numbers, avg } = response.data;
      setWindowPrevState(windowPrevState);
      setWindowCurrState(windowCurrState);
      setNumbers(numbers);
      setAverage(avg);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
      <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
      <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
      <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>

      <h2>Previous Window State: {JSON.stringify(windowPrevState)}</h2>
      <h2>Current Window State: {JSON.stringify(windowCurrState)}</h2>
      <h2>Numbers Received: {JSON.stringify(numbers)}</h2>
      <h2>Average: {average.toFixed(2)}</h2>
    </div>
  );
}

export default AverageCalculator;
