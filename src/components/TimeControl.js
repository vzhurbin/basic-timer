import React from 'react';

import {
  onTimerIncrement,
  onTimerDecrement,
  onTimerChange,
} from './../timeCounter/actions';

const TimeControl = ({
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

export default TimeControl;
