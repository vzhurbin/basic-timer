import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actions';
import layout from './components/layout';

import {
  selectTimer,
  selectDisplay,
  selectTicking,
  selectCurrentTimer,
  selectNextTimer,
} from './selectors';

const mapStateToProps = state => ({
  timer: selectTimer(state),
  display: selectDisplay(state),
  ticking: selectTicking(state),
  currentTimer: selectCurrentTimer(state),
  nextTimer: selectNextTimer(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(layout);
