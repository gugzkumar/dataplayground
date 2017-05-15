import {combineReducers} from 'redux';
import RoomListReducer from './reducer-room-list';
import MessageListReducer,{RoomReducer} from './reducer-message-list';
import MessageSocketReducer from './reducer-message-socket';
import UserToColorReducer from './reducer-user-color'

const allReducers = combineReducers({
    roomList: RoomListReducer,
    messageList: MessageListReducer,
    roomName: RoomReducer,
    messageSocket: MessageSocketReducer,
    userToColorList: UserToColorReducer

});

export default allReducers
