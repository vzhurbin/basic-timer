import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getTimer = state => state[NAME].timer.timer;
export const getDisplay = state => state[NAME].timer.display;
export const getTicking = state => state[NAME].timer.ticking;
export const getCurrentTimer = state => state[NAME].timer.currentTimer;
export const getNextTimer = state => state[NAME].timer.nextTimer;

export const selectTimer = createSelector(
  getTimer,
  timer => (timer ? timer : null),
);

export const selectTimer = createSelector(
  getTimer,
  timer => (timer ? timer : null)
);
export const selectDisplay = createSelector(
  getDisplay,
  display => (display ? display : null)
);
export const selectTicking = createSelector(
  getTicking,
  ticking => (ticking ? ticking : null)
);
export const selectCurrentTimer = createSelector(
  getCurrentTimer,
  currentTimer => (currentTimer ? currentTimer : null)
);
export const selectNextTimer = createSelector(
  getNextTimer,
  nextTimer => (nextTimer ? nextTimer : null)
);

