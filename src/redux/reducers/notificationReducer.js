import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.notifications, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_NOTI:
      return [...state, payload];
    case types.EDIT_NOTI:
      return editNotification(state, payload);
    case types.DELETE_NOTI:
      return deleteNotification(state, payload);
    default:
      return state;
  }
};

const editNotification = (state, payload) => {
  const { item, updated } = payload;
  const index = state.indexOf(item);
  const array = [...state];
  if (index >= 0) {
    array[index] = updated;
  }
  return array;
};

const deleteNotification = (state, item) => {
  const index = state.indexOf(item);
  if (index >= 0) {
    return state.filter(x => x !== item);
  }
  return state;
};
