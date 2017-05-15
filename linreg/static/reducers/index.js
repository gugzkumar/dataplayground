import {combineReducers} from 'redux';
import ModelListReducer,{ModelReducer,ResultReducer} from './reducer_model_list';

const allReducers = combineReducers({
    modelList: ModelListReducer,
    currentModel: ModelReducer,
    result: ResultReducer
});

export default allReducers
