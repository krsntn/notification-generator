import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Weeks = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DateTime = () => {
  const { enabledDateTime, time, date } = useSelector(state => state.datetime);
  const newDate = new Date(date);

  return (
    <div
      className={css.datetime}
      style={{ visibility: enabledDateTime ? '' : 'hidden' }}
    >
      <div className={css.time}>{time}</div>
      <div className={css.date}>
        {`${Weeks[newDate.getDay() - 1]}, ${newDate.getDate()} ${
          Months[newDate.getMonth()]
        }`}
      </div>
    </div>
  );
};

export default React.memo(DateTime);
