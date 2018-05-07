import React from 'react';
import { connect } from 'react-redux';

import {
  onTimerIncrement,
  onTimerDecrement,
  onTimerChange,
} from './../timeCounter/actions';

let TimeControl = ({
  name,
  value,
  onTimerIncrement,
  onTimerDecrement,
  onTimerChange,
}) => (
  <div className="control col">
    <div className="control__label">{name} time</div>
    <div className="time flex-grid">
      <span
        className="time__control"
        onClick={() => onTimerDecrement(name, '-')}
      >
        -
      </span>
      <input
        type="number"
        name={name}
        className="time__input"
        value={value}
        min={0}
        onChange={e =>
          onTimerChange(e.target.value, name, value - e.target.value)
        }
      />
      <span
        className="time__control"
        onClick={() => onTimerIncrement(name, '+')}
      >
        +
      </span>
    </div>
  </div>
);
export default connect(
  (state, ownProps) => ({ value: state.settings[ownProps.name] }),
  { onTimerIncrement, onTimerDecrement, onTimerChange },
)(TimeControl);
