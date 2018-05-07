import React from 'react';
import { connect } from 'react-redux';

import { onTimerStartStop } from './../timeCounter/actions';

let StartStop = ({ onTimerStartStop, ticking }) => (
  <div className="start-stop">
    <button
      className={
        'start-stop__button--' +
        (ticking ? 'stop' : 'start') +
        ' start-stop__button button'
      }
      onClick={() => onTimerStartStop()}
    >
      {ticking ? 'stop' : 'start'}
    </button>
  </div>
);

export default connect(state => ({ ticking: state.timer.ticking }), {
  onTimerStartStop,
})(StartStop);
