// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from '../utils/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here
});
export default rootReducer;