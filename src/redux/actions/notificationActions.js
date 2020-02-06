import * as types from './actionTypes';

export const addNewNotification = obj => ({
  type: types.ADD_NOTI,
  payload: obj,
});

export const updateNotification = obj => ({
  type: types.EDIT_NOTI,
  payload: obj,
});

export const removeNotification = obj => ({
  type: types.DELETE_NOTI,
  payload: obj,
});
