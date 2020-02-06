import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.datetime, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.EDIT_DATETIME:
      return { ...state, ...payload };
    case types.TOGGLE_DATETIME:
      return { ...state, enabledDateTime: payload };
    default:
      return state;
  }
};
