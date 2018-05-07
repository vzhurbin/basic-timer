import { combineReducers, createStore } from 'redux';

import * as t from './actionTypes';

/*
Helper functions
*/
const leadingZero = n => {
  return n < 10 ? '0' + n : n;
};

const getTimerDisplay = timerInSeconds => ({
  minutes: Math.floor(timerInSeconds / 60),
  seconds: leadingZero(timerInSeconds % 60),
});

const pomodoro = 25;
export const initialState = {
  settings: {
    [t.POMODORO]: pomodoro, // switch to "break" timer when pomodoro timer === 0
    [t.BREAK]: 5, // stop timers when "break" timer === 0
  },
  timer: {
    timer: pomodoro * 60, // in seconds
    display: {
      minutes: pomodoro,
      seconds: '00',
    },
    ticking: true,
    currentTimer: t.POMODORO,
    nextTimer: t.BREAK,
  },
};

const settings = (state = initialState.settings, action) => {
  switch (action.type) {
    case t.TIMER_INCREMENT:
      return { ...state, [action.timerType]: state[action.timerType] + 1 };
    case t.TIMER_DECREMENT:
      return { ...state, [action.timerType]: state[action.timerType] - 1 };
    case t.SET_TIMER:
      return { ...state, [action.timerType]: action.value };
    default:
      return state;
  }
};

const timer = (state = initialState.timer, action) => {
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
      return initialState.timer;
    default:
      return state;
  }
};

const reducers = combineReducers({
  settings,
  timer,
});

// export default reducers;

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
