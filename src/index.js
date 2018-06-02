import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducer from './reducers';
import EventEmitter from 'events';
import registerServiceWorker from './registerServiceWorker';

const emitter = new EventEmitter();

const middleware = [ thunk ];
/* if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
} */

const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <App emitter={emitter} />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();