import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Timer() {
  const dispatch = useDispatch();
  const timerRef = useSelector((state) => state.timer);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timerRef > 0) {
        dispatch({ type: 'SET_TIMER', payload: timerRef - 1 });
      } else {
        clearInterval(countdown);
        // Automatically navigate to the report page when the timer runs out
        navigate('/report');
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [dispatch, navigate, timerRef]);

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <div>Timer: {formatTimer(timerRef)}</div>;
}

export default Timer;
