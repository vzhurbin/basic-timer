import React from 'react';

import TimerDisplay from './../../../components/TimerDisplay';
import StartStop from './../../../components/StartStop';
import Reset from './../../../components/Reset';

export class Timer extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => {
      const { ticking, actions, settings } = this.props;
      if (ticking) {
        actions.onTick(settings);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { actions, display, currentTimer, ticking } = this.props;
    return (
      <div className="wrapper">
        <TimerDisplay
          minutes={display.minutes}
          seconds={display.seconds}
          currentTimer={currentTimer}
        />
        <div className="controls-container">
          <StartStop
            ticking={ticking}
            onTimerStartStop={actions.onTimerStartStop}
          />
          <Reset onTimerReset={actions.onTimerReset} />
        </div>
      </div>
    );
  }
}

export default Timer;
