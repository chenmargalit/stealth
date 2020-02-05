import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// We are using redux thunk here. The purpose of redux-thunk is to let us do something before dispatching an action. The action ceator returns a function lets name it dispatch, dispatch will then return the action. This means we can use dispatch to do anything we want. In this case it will give us the possibility to wait for the async action to happen, we give our selves the ability to wait for the answer and not send an action which doesnt have the response it needs because it takes time.

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log('problem with current_user', err);
  }
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const handleToken = token => async dispatch => {
  // console.log('handleToken is running in index.js');
  // try {
  // console.log('handleToken working');
  const res = await axios.post('/api/strip', token);
  dispatch({ type: FETCH_USER, payload: res.data });
  // } catch (err) {
  // console.log('problem with handleToken', err);
  // }
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
