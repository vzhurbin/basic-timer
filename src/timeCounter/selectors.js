import { createSelector } from 'reselect';
// import { NAME } from './constants';

export const getTimer = state => state.timer;
export const getDisplay = state => state.display;
export const getTicking = state => state.ticking;
export const getCurrentTimer = state => state.currentTimer;
export const getNextTimer = state => state.nextTimer;

export const selectTimer = createSelector(
  getTimer,
  timer => (timer ? timer : null),
);
export const selectDisplay = createSelector(
  getDisplay,
  display => (display ? display : null),
);
export const selectTicking = createSelector(
  getTicking,
  ticking => (ticking ? ticking : null),
);
export const selectCurrentTimer = createSelector(
  getCurrentTimer,
  currentTimer => (currentTimer ? currentTimer : null),
);
export const selectNextTimer = createSelector(
  getNextTimer,
  nextTimer => (nextTimer ? nextTimer : null),
);
