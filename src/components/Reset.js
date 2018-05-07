import React from 'react';

const Reset = ({ onTimerReset }) => (
  <div className="reset">
    <button className="button-anchor" onClick={() => onTimerReset()}>
      reset
    </button>
  </div>
);

export default Reset;
