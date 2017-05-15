import { Map, fromJS } from 'immutable';
export default function(state = null, action){
    switch (action.type) {
        case "MESSAGES_REQUEST":
            return state
            break;
        case 'MESSAGES_RECEIVED':
            if(action.payload['status']=='OK'){
                return fromJS(action.payload['messages'])
            }
            else{
                return state
            }
        case 'NEW_MESSAGE':
            if(action.payload['status']=='OK'){
                return state.push(Map(action.payload['message']))
            }
            else{
                return state
            }
    }
    return state
}

export const RoomReducer =(state = '', action) => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            if(action.payload['status']=='OK'){
                return action.payload['room_name']
            }
            else{
                return state
            }
    }
    return state
}