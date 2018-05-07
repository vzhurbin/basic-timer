import React from 'react';
import { connect } from 'react-redux';

const TimerDisplay = ({ minutes, seconds, currentTimer }) => (
  <div className={`timer-container timer-container--${currentTimer}`}>
    <h1 className="timer">
      <span className="timer__mins">{minutes}</span>
      :
      <span className="timer__secs">{seconds}</span>
    </h1>
  </div>
);
export default connect(state => ({
  minutes: state.timer.display.minutes,
  seconds: state.timer.display.seconds,
  currentTimer: state.timer.currentTimer.toLowerCase(),
}))(TimerDisplay);
