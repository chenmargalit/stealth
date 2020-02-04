import axios from 'axios';
import { FETCH_USER } from './types';

// We are using redux thunk here. The purpose of redux-thunk is to let us do something before dispatching an action. The action ceator returns a function lets name it dispatch, dispatch will then return the action. This means we can use dispatch to do anything we want. In this case it will give us the possibility to wait for the async action to happen, we give our selves the ability to wait for the answer and not send an action which doesnt have the response it needs because it takes time.

export const fetchUser = () => async dispatch => {
  try {
    console.log('fetchuser action running');
    const res = await axios.get('/api/current_user');
    console.log('what is res.data?', res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log('problem with current_user', err);
  }
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
