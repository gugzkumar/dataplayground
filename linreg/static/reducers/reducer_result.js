export const ModelReducer =(state = 0, action) => {
    switch (action.type) {
        case 'RESULT_RECEIVED':
            return action.payload['prediction']
    }
    return state
}