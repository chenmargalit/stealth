import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReudcer from './authReducer';
import surveysReducer from './surveysReducer';

// auth here will be the name we use in our app to access this reducer (the state of auth, is someone authed)
export default combineReducers({
  auth: authReudcer,
  form: reduxForm,
  surveys: surveysReducer
});
