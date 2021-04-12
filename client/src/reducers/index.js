import {combineReducers} from 'redux';
import auth from './auth';
import token from './token';
import plannerReducers from './planner';
export default combineReducers({
    auth,token,plannerReducers
});