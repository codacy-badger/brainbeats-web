import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api, { BackendContext } from './util/api';
import * as serviceWorker from './serviceWorker';

const api: Api = new Api();

ReactDOM.render(
  <BackendContext.Provider value={api}>
    <App />
  </BackendContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
