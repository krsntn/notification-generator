import React, { useCallback } from 'react';
import * as actions from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';
import css from './index.module.scss';

const RotateControl = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(
    direction => {
      dispatch({
        type: actions.TOGGLE_WALLPAPER,
        payload: direction,
      });
    },
    [dispatch]
  );
  return (
    <div className={css.control}>
      <button
        className={`btn btn-secondary ${css.button}`}
        onClick={() => handleClick('previous')}
      >
        &larr;
      </button>
      <button
        className={`btn btn-secondary ${css.button}`}
        onClick={() => handleClick('next')}
      >
        &rarr;
      </button>
    </div>
  );
};

export default React.memo(RotateControl);
