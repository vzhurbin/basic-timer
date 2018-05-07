import React, { Component } from 'react';
import TimerContainer from './timeCounter/components/layout';
import TimerDisplay from './components/TimerDisplay';
import TimeControl from './components/TimeControl';
import StartStop from './components/StartStop';
import Reset from './components/Reset';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <TimerContainer />
        <TimerDisplay />
        <div className="controls-container">
          <StartStop />
          <Reset />
          <TimeControl name="BREAK" />
          <TimeControl name="POMODORO" />
        </div>
      </div>
    );
  }
}

export default App;
