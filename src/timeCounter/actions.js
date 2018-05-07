import * as t from './actionTypes';

export const onTick = settings => ({ type: t.TIMER_TICK, settings });

export const onTimerIncrement = timerType => ({
  type: t.TIMER_INCREMENT,
  timerType,
});

export const onTimerDecrement = timerType => ({
  type: t.TIMER_DECREMENT,
  timerType,
});

export const onTimerChange = (value, timerType, difference) => ({
  type: t.SET_TIMER,
  value,
  timerType,
  difference,
});

export const onTimerStartStop = () => ({
  type: t.TIMER_START_STOP,
});

export const onTimerReset = () => ({
  type: t.TIMER_RESET,
});
