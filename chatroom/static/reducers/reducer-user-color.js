import randomColor from 'randomcolor'
export default function(state = null, action){
    switch (action.type) {
        case 'ROOM_LIST_RECEIVED':
            if(action.payload['status']=='OK'){
                var color_map ={};
                for (var user_name of action.payload['user_list']){
                    color_map[user_name] = randomColor({luminosity: 'dark'})
                }
                return color_map
            }
            else{
                return state
            }
    }
    return state
}
