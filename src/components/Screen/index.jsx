import React, { useState, useEffect } from 'react';
import css from './index.module.scss';
import StatusBar from '../StatusBar';
import DateTime from '../DateTime';
import Notification from '../Notification';
import RotateControl from '../RotateControl';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';

const Screen = () => {
  const notifications = useSelector(state => state.notifications);
  const { file: wallpaper } = useSelector(state => state.wallpaper);
  const [displayWallpaper, setDisplayWallpaper] = useState(wallpaper);

  useEffect(() => {
    document
      .querySelector('#screen')
      .addEventListener('mouseenter', showOverlay);
    document
      .querySelector('#overlay')
      .addEventListener('mouseleave', hideOverlay);
    document.querySelector('#wallpaper').addEventListener('load', hideLoading);
    return () => {
      document
        .querySelector('#screen')
        .removeEventListener('mouseenter', showOverlay);
      document
        .querySelector('#overlay')
        .removeEventListener('mouseleave', hideOverlay);
      document
        .querySelector('#wallpaper')
        .removeEventListener('load', hideLoading);
    };
  }, []);

  useEffect(() => {
    document.querySelector('#loading').style.display = '';
    import(`../../images/wallpapers/${wallpaper}`).then(module => {
      setDisplayWallpaper(module.default);
    });
  }, [wallpaper]);

  function showOverlay() {
    document.querySelector('#overlay').style.display = '';
  }

  function hideOverlay() {
    document.querySelector('#overlay').style.display = 'none';
  }

  function hideLoading() {
    document.querySelector('#loading').style.display = 'none';
  }

  const downloadImg = () => {
    const screen = document.querySelector('#screen');

    html2canvas(screen, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then(canvas => {
      saveAs(canvas.toDataURL(), 'screen-shot.png');
    });
  };

  function saveAs(uri, filename) {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  return (
    <div className={css.screen_container}>
      <div className={css.screen_border}>
        <div className={css.screenDiv}>
          <div id="screen" className={css.screen}>
            <img
              id="wallpaper"
              className={css.wallpaper}
              alt="wallpaper"
              src={displayWallpaper}
            />
            <StatusBar />
            <DateTime />
            {notifications.map((item, index) => (
              <Notification
                key={index}
                from={item.from}
                content={item.content}
              />
            ))}
          </div>
          <div id="overlay" className={css.overlay} style={{ display: 'none' }}>
            <div>
              <button
                className="btn btn-secondary btn-lg"
                onClick={downloadImg}
              >
                Download
              </button>
            </div>
          </div>
          <div id="loading" className={css.overlay}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <RotateControl></RotateControl>
    </div>
  );
};

export default React.memo(Screen);
