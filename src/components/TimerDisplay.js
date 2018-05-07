import React from 'react';

const TimerDisplay = ({ minutes, seconds, currentTimer }) => (
  <div className={`timer-container timer-container--${currentTimer}`}>
    <h1 className="timer">
      <span className="timer__mins">{minutes}</span>
      :
      <span className="timer__secs">{seconds}</span>
    </h1>
  </div>
);

export default TimerDisplay;
