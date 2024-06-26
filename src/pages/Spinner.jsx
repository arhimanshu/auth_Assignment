import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Homepage from './Homepage';
import Login from '../Authorize/Login';
function Spinner() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(intervalId); // Stop the interval
      navigate('/Login'); // Navigate to the root route
    }

    return () => clearInterval(intervalId); // Clear on unmount
  }, [count, navigate]);

  return <div>
    <h5>Rendering you back to homepage in {count} seconds ,please login first</h5>
    
    </div>;
}

export default Spinner;
