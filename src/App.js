import React from 'react';
import Screen from './components/Screen';
import css from './App.module.scss';
import Form from './components/Form';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className={`container-fluid ${css.App}`}>
        <div className="row">
          <div className="col-md-7">
            <div className={`${css.title} text-primary`}>
              Lock Screen Notification Generator
            </div>
            <Form></Form>
          </div>
          <div className="col-md-5">
            <Screen></Screen>
          </div>
        </div>
        <p className={css.disclaimer}>
          Made by <a href="https://github.com/krsntn">Karson</a>.
        </p>
      </div>
    </Provider>
  );
}

export default App;
