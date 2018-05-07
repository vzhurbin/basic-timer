import { createStore } from 'redux';

import * as t from './actionTypes';

/*
Helper functions
*/
const leadingZero = n => {
  return n < 10 ? `0${n}` : n;
};

const getTimerDisplay = timerInSeconds => ({
  minutes: Math.floor(timerInSeconds / 60),
  seconds: leadingZero(timerInSeconds % 60),
});

const pomodoro = 25;

export const initialState = {
  timer: pomodoro * 60, // in seconds
  display: {
    minutes: pomodoro,
    seconds: '00',
  },
  ticking: true,
  currentTimer: t.POMODORO,
  nextTimer: t.BREAK,
};

const timer = (state = initialState, action) => {
  let timer;
  switch (action.type) {
    case t.SET_TIMER:
      // editing the current timer?
      if (action.timerType === state.currentTimer) {
        timer = state.timer - action.difference * 60; // * 60: in seconds
        if (timer < 0) timer = 0;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case t.TIMER_INCREMENT:
      if (action.timerType === state.currentTimer) {
        timer = state.timer + 60;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case t.TIMER_DECREMENT:
      if (action.timerType === state.currentTimer) {
        timer = state.timer - 60;
        if (timer < 0) timer = 0;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case t.TIMER_TICK:
      timer = state.timer - 1;
      if (timer < 0) {
        timer = action.settings[state.nextTimer] * 60;
        return {
          ...state,
          currentTimer: state.nextTimer,
          nextTimer: state.currentTimer,
          timer,
          display: getTimerDisplay(timer),
        };
      }
      return { ...state, timer, display: getTimerDisplay(timer) };
    case t.TIMER_START_STOP:
      return { ...state, ticking: !state.ticking };
    case t.TIMER_RESET:
      return initialState;
    default:
      return state;
  }
};

const store = createStore(
  timer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
