import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import SelectContainer from './containers/select_container'
import CreateContainer from './containers/create_container'
import allReducers from './reducers/index'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
    allReducers,
    //applyMiddleware(thunk, promise, logger)
    applyMiddleware(thunk, promise)
);


ReactDOM.render(<Provider store={store}><CreateContainer/></Provider>, document.getElementById('create_model'))
ReactDOM.render(<Provider store={store}><SelectContainer/></Provider>, document.getElementById('select_model'))