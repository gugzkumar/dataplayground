export default function(state = null, action){
    switch (action.type) {
        case "MESSAGES_REQUEST":
            if(state)
                state.close()
            return action.socket
            break;
    }
    return state
}
