import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';
import datetimeReducer from './datetimeReducer';
import wallpaperReducer from './wallpaperReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  datetime: datetimeReducer,
  wallpaper: wallpaperReducer,
  app: appReducer,
});

export default rootReducer;
