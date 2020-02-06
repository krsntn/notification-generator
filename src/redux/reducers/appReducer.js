import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.app, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.TOGGLE_APP:
      return toggleApp(payload);
    default:
      return state;
  }
};

const toggleApp = app => {
  switch (app) {
    case 'iMessage':
      return apps[0];
    case 'wechat':
      return apps[1];
    default:
      return apps[0];
  }
};

const apps = [
  {
    name: 'iMessage',
    title: 'MESSAGES',
    displayTime: 'now',
  },
  {
    name: 'wechat',
    title: '微信',
    displayTime: '現在',
  },
];
