# Curso de Redux por Bedu

### Fases de Redux

#### Store

Para empezar a utilizar Redux deberemos instalar sus respectivos paquetes:

`npm install redux react-redux -S -E`

Luego de empezamos a configurar nuestro index.js, el cual es el archivo que se conecta a nuestro HTML y es el que renderiza todo nuestro proyecto. Esto con el fin te empezar a tener un ambiente para el almacenamiento global.

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore (
  {}, // Todos los reducers
  {}  // Estado inicial
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```