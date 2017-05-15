import { Map, fromJS } from 'immutable';
export default function(state = null, action){
    switch (action.type) {
        case "MODEL_LIST":
            console.log('AAA')
            return fromJS(action.payload);
        case 'NEW_MODEL':
            console.log('WTF')
            return state.push(Map(fromJS(action.payload)))
    }
    return state
}

export const ModelReducer =(state = null, action) => {
    switch (action.type) {
        case 'MODEL_SELECTED':
            return action.payload
    }
    return state
}


export const ResultReducer =(state = null, action) => {
    switch (action.type) {
        case 'RESULT_RECEIVED':
            return action.payload['prediction']
    }
    return state
}