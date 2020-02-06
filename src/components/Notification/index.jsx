import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';

const Notification = props => {
  const { name, title, displayTime } = useSelector(state => state.app);
  const appFile = `${name}.svg`;

  const { from, content } = props;

  return (
    <div className={css.container}>
      <div className={css.topbar}>
        <div className={css.title}>
          <img
            src={require(`../../images/${appFile}`)}
            alt="iMessage"
            className={css.logo}
          />
          {title}
        </div>
        <div className={css.datetime}>{displayTime}</div>
      </div>
      <div className={css.from}>{from}</div>
      <div className={css.content}>{content}</div>
    </div>
  );
};

export default React.memo(Notification);
