import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';

import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers/index'

const store = createStore (
  reducers, // Todos los reducers
  {},       // Estado inicial
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} > {/* Intenta proveer un almacenamiento al container APP, es decir que sú store es igual a la constante store ya creada*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);