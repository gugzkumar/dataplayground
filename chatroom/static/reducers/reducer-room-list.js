export default function(state = null, action){
    switch (action.type) {
        case "ROOM_LIST_REQUEST":
            return state
            break;
        case 'ROOM_LIST_RECEIVED':
            if(action.payload['status']=='OK'){
                return action.payload['room_list']
            }
            else{
                return state
            }
    }
    return state
}
