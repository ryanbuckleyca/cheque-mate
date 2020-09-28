import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './components/_custom-variables.scss';
import Landing from './components/landing';
import * as serviceWorker from './serviceWorker';
import swapWords from './components/swapwords'

ReactDOM.render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

swapWords();
