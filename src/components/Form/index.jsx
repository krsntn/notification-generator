import React, { useCallback, useEffect } from 'react';
import * as actions from '../../redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import css from './index.module.scss';
import wechat from '../../images/wechat.svg';
import iMessage from '../../images/iMessage.svg';

const Form = props => {
  const notifications = useSelector(state => state.notifications);
  const { enabledDateTime, time } = useSelector(state => state.datetime);
  const { name: appName } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const addNoti = useCallback(() => {
    let newNotification = { from: 'Jason', content: 'I miss you' };
    if (appName === 'wechat') {
      newNotification = { from: '張傑', content: '我想你了' };
    }
    dispatch({
      type: actions.ADD_NOTI,
      payload: newNotification,
    });
  }, [dispatch, appName]);

  const deleteNoti = useCallback(
    item => {
      dispatch({
        type: actions.DELETE_NOTI,
        payload: item,
      });
    },
    [dispatch]
  );

  const handleDateTimeChange = useCallback(() => {
    const timeValue = document.querySelector('#time').value;
    const dateValue = document.querySelector('#datePicker').value;

    dispatch({
      type: actions.EDIT_DATETIME,
      payload: {
        time: timeValue,
        date: dateValue,
      },
    });
  }, [dispatch]);

  const handleNotificationChange = useCallback(
    (event, item, type) => {
      dispatch({
        type: actions.EDIT_NOTI,
        payload: {
          item: item,
          updated: {
            from: type === 'from' ? event.target.value : item.from,
            content: type === 'content' ? event.target.value : item.content,
          },
        },
      });
    },
    [dispatch]
  );

  const toggleDateTime = useCallback(() => {
    dispatch({
      type: actions.TOGGLE_DATETIME,
      payload: !enabledDateTime,
    });
  }, [dispatch, enabledDateTime]);

  const handleAppClick = useCallback(
    app => {
      dispatch({
        type: actions.TOGGLE_APP,
        payload: app,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    document.querySelector(
      '#datePicker'
    ).value = new Date().toISOString().split('T')[0];
    handleDateTimeChange();
  }, [handleDateTimeChange]);

  return (
    <div className={css.container}>
      <form>
        <hr />
        <div className="form-group">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch"
              onChange={toggleDateTime}
              checked={enabledDateTime}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitch"
            ></label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            className="form-control"
            type="time"
            value={time}
            onChange={handleDateTimeChange}
            disabled={!enabledDateTime}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="datePicker"
            type="date"
            className="form-control"
            onChange={handleDateTimeChange}
            disabled={!enabledDateTime}
          />
        </div>
        <hr />
        <div className="form-group">
          <label>App</label>
          <div className={css.app_div}>
            <div
              className={css.app_box}
              data-selected={appName === 'wechat'}
              onClick={() => handleAppClick('wechat')}
            >
              <img src={wechat} alt="wechat" className={css.app_logo} />
            </div>
            <div
              className={css.app_box}
              data-selected={appName === 'iMessage'}
              onClick={() => handleAppClick('iMessage')}
            >
              <img src={iMessage} alt="iMessage" className={css.app_logo} />
            </div>
          </div>
        </div>
        <hr />
        <label>Notifications</label>
        {notifications.map((item, index) => {
          return (
            <div className="form-row" key={index}>
              <div className="form-group col-4">
                <input
                  type="text"
                  className="form-control"
                  value={item.from}
                  onChange={e => handleNotificationChange(e, item, 'from')}
                />
              </div>
              <div className="form-group col-7">
                <input
                  type="text"
                  className="form-control"
                  value={item.content}
                  onChange={e => handleNotificationChange(e, item, 'content')}
                />
              </div>
              <div className="form-group col-1">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteNoti(item)}
                >
                  &ndash;
                </button>
              </div>
            </div>
          );
        })}

        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={addNoti}
            disabled={notifications.length >= 5}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Form);
