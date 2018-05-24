import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EventEmitter from 'events';
import registerServiceWorker from './registerServiceWorker';

const emitter = new EventEmitter();

ReactDOM.render(<App emitter={emitter} />, document.getElementById('root'));
registerServiceWorker();