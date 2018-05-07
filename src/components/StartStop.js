import React from 'react';
import { connect } from 'react-redux';

import { onTimerStartStop } from './../timeCounter/actions';

const StartStop = ({ onTimerStartStop, ticking }) => (
  <div className="start-stop">
    <button onClick={() => onTimerStartStop()}>
      {ticking ? 'stop' : 'start'}
    </button>
  </div>
);

export default connect(state => ({ ticking: state.timer.ticking }), {
  onTimerStartStop,
})(StartStop);
