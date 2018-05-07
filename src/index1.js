import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Timer from './Timer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Timer />, document.getElementById('root'));
registerServiceWorker();
