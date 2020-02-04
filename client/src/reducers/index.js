import { combineReducers } from 'redux';

import authReudcer from './authReducer';

// auth here will be the name we use in our app to access this reducer (the state of auth, is someone authed)
export default combineReducers({
  auth: authReudcer
});
