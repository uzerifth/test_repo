import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import promise from 'redux-promise';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import MainForm from './bin/form'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="body-main">
        <MainForm/>
      </div>
      </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
