import { Map, fromJS } from 'immutable';
export default function(state = null, action){
    switch (action.type) {
        case "MODEL_LIST":
            return state;
        case 'NEW_MODEL':
            if(action.payload['status']=='OK'){
                return state.push(Map(action.payload['message']))
            }
            else{
                return state
            }
    }
    return state
}
