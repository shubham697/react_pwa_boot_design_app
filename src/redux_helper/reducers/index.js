import {combineReducers} from 'redux';
// import reducers
import userReducer from './user';
import loadingReducer from './loading';
import alertReducer from './alert';
import globalReducer from './global';
import bootReducer from './boot';
import mysaveReducer from './mysave';

export default combineReducers({
    userReducer,loadingReducer, alertReducer,globalReducer, bootReducer, mysaveReducer,
});