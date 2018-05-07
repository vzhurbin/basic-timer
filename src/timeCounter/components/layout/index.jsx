import React from 'react';
import { connect } from 'react-redux';

import { onTick } from './../../actions';

export class Timer extends React.Component {
  componentDidMount() {
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

  render() {
    return null;
  }
}

export default connect(
  state => ({
    currentTimer: state.timer.currentTimer,
    ticking: state.timer.ticking,
    settings: state.settings,
  }),
  { onTick },
)(Timer);
