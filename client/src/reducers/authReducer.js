import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log('fetch user activated');
      console.log('payload is', action.payload);
      // if there IS something in payload, return it, if its an empty string, return false
      return action.payload || false;
    default:
      return state;
  }
}
