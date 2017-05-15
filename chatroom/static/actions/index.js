export const requestRoomList = (socket) => {
    socket.send(JSON.stringify({action: 'get_room_list'}))
    return {
        type: 'ROOM_LIST_REQUEST',
        payload: null
    }
};

export const getRoomList = (content) => {
    return {
        type: 'ROOM_LIST_RECEIVED',
        payload: JSON.parse(content)
    }
};

export const requestMessages = (room_id, socket) => {
    socket.send(JSON.stringify({action: 'get_message_history'}))
    return {
        type: 'MESSAGES_REQUEST',
        payload: null,
        socket: socket
    }
};

export const getMessages =(content) => {
    var parsed_content= JSON.parse(content)
    if(parsed_content['status'] == 'OK'){
        if(parsed_content['type'] =='REFRESH'){
            return {
                type: 'MESSAGES_RECEIVED',
                payload: parsed_content
            }
        }
        else if(parsed_content['type'] =='NEWMESSAGE'){
            return {
                type: 'NEW_MESSAGE',
                payload: parsed_content
            }
        }
    }
};

export const sendMessage =(socket, message) =>{
    socket.send(JSON.stringify({action: 'send_message', message: message}))
    return {
        type: 'MESSAGE_SENT',
        payload: null
    }
};

export const newMessage =(content) =>{
    return {
        type: 'NEW_MESSAGE',
        payload: JSON.parse(content)
    }
};