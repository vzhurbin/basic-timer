import React from 'react';
import { connect } from 'react-redux';

import { onTimerReset } from './../timeCounter/actions';

const Reset = ({ onTimerReset }) => (
  <div className="reset">
    <button className="button-anchor" onClick={() => onTimerReset()}>
      reset
    </button>
  </div>
);

export default connect(null, { onTimerReset })(Reset);
