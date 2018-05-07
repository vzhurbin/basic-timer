import React from 'react';

const StartStop = ({ onTimerStartStop, ticking }) => (
  <div className="start-stop">
    <button onClick={() => onTimerStartStop()}>
      {ticking ? 'stop' : 'start'}
    </button>
  </div>
);

export default StartStop;
