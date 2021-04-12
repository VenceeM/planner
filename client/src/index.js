import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducers from './reducers';
import DataProvider from './context/store';


ReactDOM.render(
  <DataProvider><App/></DataProvider>,

  document.getElementById('root')
);

