# Curso de Redux por Bedu

### Fases de Redux

#### Reducers

Los reducers son funciones puras que reciben como parámetros, el estado inicial y una acción.

```
//Aquí se crea la función, el estado inicial es un objeto vacío, y la acción es la //"tarea a realizar"
function reducer(state = {}, action){
	//se crea el switch porque llegaran varias tareas y solo se distingue por el //nombre

	switch(action.type){
	//la tarea que llegara en esta ocasión es 'traer_usuarios'

		case'traer_usuarios':{

	//esta parte es destructurar el estado que es un objeto curso de fundamentos //de JavaScripts muy bueno

		return{...state,  usuarios: action.payload}
}

//despues de todo eso de exportara el reducer

export default reducer;
```
----

Las ***Action Creators* describen que algo pasó, pero no especifican cómo cambió el estado de la aplicación en respuesta. Esto es trabajo de los reducers.

El ***Provider*** es el componente de Redux en el cual encerraremos nuestra aplicación para que puedan comunicarse los componentes entre ellos.

Para nuestro proyecto vamos a darle un reducer valido a nustro almacenamiento para que nuetra aplicacion funcione.

./src/reducers/index.js
```
import { combineReducers } from 'redux';
import usuariosReducers from './usuariosReducers'

export default combineReducers ({
	usuariosReducers
})
```
./src/reducers/usuariosReducers.js
```
const INITIAL_STATE = {
	usuarios: []
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'traer_usuarios':
			return { ...state, usuarios: action.payload}

			default: return state;
	}
}
```

./src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/index'

const store = createStore (
  reducers, // Todos los reducers
  {}  // Estado inicial
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} > {/* Intenta proveer un almacenamiento al container APP, es decir que sú store es igual a la constante store ya creada*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```