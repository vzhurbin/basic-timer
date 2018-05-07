// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';

/*
Helper functions
*/
function leadingZero(n) {
  return n < 10 ? '0' + n : n;
}

const getTimerDisplay = timerInSeconds => ({
  minutes: Math.floor(timerInSeconds / 60),
  seconds: leadingZero(timerInSeconds % 60),
});

function spawnNotification(theBody, theIcon = pomodoroIcon) {
  return new Notification('Pomodoro', {
    body: theBody,
    icon: theIcon,
  });
}

/*
Reducers 🍅✨🍕
*/
const pomodoro = 25;
const TIMERS = {
  POMODORO: 'POMODORO',
  BREAK: 'BREAK',
};
const initialState = {
  settings: {
    [TIMERS.POMODORO]: pomodoro, // switch to "break" timer when pomodoro timer === 0
    [TIMERS.BREAK]: 5, // stop timers when "break" timer === 0
  },
  timer: {
    timer: pomodoro * 60, // in seconds
    display: {
      minutes: pomodoro,
      seconds: '00',
    },
    ticking: true,
    currentTimer: TIMERS.POMODORO,
    nextTimer: TIMERS.BREAK,
  },
};

const settings = (state = initialState.settings, action) => {
  switch (action.type) {
    case 'TIMER_INCREMENT':
      return { ...state, [action.timerType]: state[action.timerType] + 1 };
    case 'TIMER_DECREMENT':
      return { ...state, [action.timerType]: state[action.timerType] - 1 };
    case 'SET_TIMER':
      return { ...state, [action.timerType]: action.value };
    default:
      return state;
  }
};

const timer = (state = initialState.timer, action) => {
  let timer;
  switch (action.type) {
    case 'SET_TIMER':
      // editing the current timer?
      if (action.timerType === state.currentTimer) {
        timer = state.timer - action.difference * 60; // * 60: in seconds
        if (timer < 0) timer = 0;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case 'TIMER_INCREMENT':
      if (action.timerType === state.currentTimer) {
        timer = state.timer + 60;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case 'TIMER_DECREMENT':
      if (action.timerType === state.currentTimer) {
        timer = state.timer - 60;
        if (timer < 0) timer = 0;
        return { ...state, timer, display: getTimerDisplay(timer) };
      }
      return state;
    case 'TIMER_TICK':
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
    case 'TIMER_START_STOP':
      return { ...state, ticking: !state.ticking };
    case 'TIMER_RESET':
      return initialState.timer;
    default:
      return state;
  }
};

const reducers = combineReducers({
  settings,
  timer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// 🎐 ACTION CREATORS
const onTick = settings => ({ type: 'TIMER_TICK', settings });

const onTimerIncrement = timerType => ({
  type: 'TIMER_INCREMENT',
  timerType,
});

const onTimerDecrement = timerType => ({
  type: 'TIMER_DECREMENT',
  timerType,
});

const onTimerChange = (value, timerType, difference) => ({
  type: 'SET_TIMER',
  value,
  timerType,
  difference,
});

const onTimerStartStop = () => ({
  type: 'TIMER_START_STOP',
});

const onTimerReset = () => ({
  type: 'TIMER_RESET',
});

/*
Presentational components
*/
let TimerDisplay = ({ minutes, seconds, currentTimer }) => (
  <div className={`timer-container timer-container--${currentTimer}`}>
    <h1 className="timer">
      <span className="timer__mins">{minutes}</span>
      :
      <span className="timer__secs">{seconds}</span>
    </h1>
  </div>
);
TimerDisplay = connect(state => ({
  minutes: state.timer.display.minutes,
  seconds: state.timer.display.seconds,
  currentTimer: state.timer.currentTimer.toLowerCase(),
}))(TimerDisplay);

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
TimeControl = connect(
  (state, ownProps) => ({ value: state.settings[ownProps.name] }),
  { onTimerIncrement, onTimerDecrement, onTimerChange },
)(TimeControl);

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
StartStop = connect(state => ({ ticking: state.timer.ticking }), {
  onTimerStartStop,
})(StartStop);

let Reset = ({ onTimerReset }) => (
  <div className="reset">
    <button className="button-anchor" onClick={() => onTimerReset()}>
      reset
    </button>
  </div>
);
Reset = connect(null, { onTimerReset })(Reset);

/**
 * Timer {class}
 * Dispatches an action every second while a timer is ticking
 * If permission is granted, spawns a notification once a timer ends
 */
export class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Notification.requestPermission();

    this.timerID = setInterval(() => {
      const { ticking, onTick, settings } = this.props;
      if (ticking) {
        onTick(settings);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
    const nextTimer = nextProps.currentTimer;
    if (this.props.currentTimer !== nextTimer) {
      // beep();
      spawnNotification('bla', pomodoroIcon);

      if (Notification.permission === 'granted') {
        spawnNotification(
          nextTimer === TIMERS.BREAK ? 'Take a break' : 'Get back to work',
        );
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}
export const TimerContainer = connect(
  state => ({
    currentTimer: state.timer.currentTimer,
    ticking: state.timer.ticking,
    settings: state.settings,
  }),
  { onTick },
)(Timer);

const App = () => (
  <div className="wrapper">
    <TimerContainer />
    <TimerDisplay />
    <div className="controls-container">
      <StartStop />
      <Reset />
      <TimeControls />
    </div>
  </div>
);

export const TimeControls = () => (
  <div className="timer-settings flex-grid">
    <TimeControl name={TIMERS.BREAK} />
    <TimeControl name={TIMERS.POMODORO} />
  </div>
);

//  🔲🔲🔲
// 🔲🔲🔲🔲 Containers

// 🌳 #root
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// 🍅
var pomodoroIcon =
  'data:image/png;base64,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';
