
export const getModelList = (data) => {
    console.log(data)
    return {
        type: 'MODEL_LIST',
        payload: data
    }
};


export const selectedModel = (data) => {
    return {
        type: 'MODEL_SELECTED',
        payload: data
    }
};


export const resultReceived = (data) => {
    return {
        type: 'RESULT_RECEIVED',
        payload: data
    }
};

export const createdModel = (data) => {
    return {
        type: 'NEW_MODEL',
        payload: data
    }
};
