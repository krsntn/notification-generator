import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.wallpaper, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.TOGGLE_WALLPAPER:
      return getWallpaper(state.index, payload);
    default:
      return state;
  }
};

function getWallpaper(index, direction) {
  let newIndex = direction === 'next' ? index + 1 : index - 1;
  if (newIndex < 0) {
    newIndex = wallpapers.length - 1;
  }
  const ind = newIndex % wallpapers.length;
  return { index: newIndex, file: wallpapers[ind] };
}

const wallpapers = [
  'ios.jpeg',
  'ENKDjFUO8DVHEL.jpg',
  'ENKDjk16VD29GL.jpg',
  'ENKDkk2ND9kw1c.jpg',
  'ENKDkkXTuruXhw.jpg',
  'ENKDlAl9PBpoaA.jpg',
  'ENKDlB94r5sw30.jpg',
  'ENKDmA42FNSbBN.jpg',
  'ENKDmAH8eaaat8.jpg',
  'ENKDmAQ663z60t.jpg',
  'ENKDmAZ6MJ2mRk.jpg',
  'ENKDmZhOx2k3ih.jpg',
  'ENKDmow1pntbZM.jpg',
  '304b345757636e785346.jpg',
  '304b345757637a4c4550.jpg',
  '470e0003c73382218906.jpg',
];
