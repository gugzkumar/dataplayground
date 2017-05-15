import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import ChatRoomTitle from './components/ChatRoomTitle'
import RoomList from './containers/room_list'
import MessageList from './containers/message_list'
import InputContainer from './containers/input_container'
import SendButton from './components/SendButton'
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

ReactDOM.render(<Provider store={store}><RoomList/></Provider>, document.getElementById('chat_lobby'))
ReactDOM.render(<Provider store={store}><MessageList/></Provider>, document.getElementById('message_container'))
ReactDOM.render(<Provider store={store}><InputContainer/></Provider>, document.getElementById('input_container'))
ReactDOM.render(<Provider store={store}><ChatRoomTitle room_name="BasketBall"/></Provider>, document.getElementById('room_title_container'))