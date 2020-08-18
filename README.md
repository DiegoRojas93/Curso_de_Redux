# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Escenarios asíncronos

Hay cierto tiempo de demora para que se renderice los datos de nuestra API en nuestro componente, por ello tambien necesitaremos saber sus estados de carga en Redux, para ello deberemos carmbiar nuestro codigo en la API.

Para ello debemos crear un dispatch y un estado para cuando este cargando el componente.

.src/types/usersTipes
```
export const TRAER_TODOS = `traer usuarios`;
export const CARGANDO = `cargando`;
```

.src/reducers/usuariosReducers.js
```
import { TRAER_TODOS, CARGANDO } from '../types/usersTipes'

const INITIAL_STATE = {
	usuarios: [],
	cargando: false
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODOS:
			return {
				...state,
				usuarios: action.payload,
				cargando:false
			}

		case CARGANDO:
			return { ...state, cargando: true}

		default: return state;
	}
}
```

./src/actions/usuariosActions.js
```
import axios from 'axios';

import { TRAER_TODOS, CARGANDO } from '../types/usersTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	});

	try {
		const response =await axios.get('https://jsonplaceholder.typicode.com/users');

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	}catch (error){
		console.log('Error: ', error.message);
	}
}
```

Si hay un error en la peticion tambien deberemos presentarlo como un estado. Para ello deberemos confugurar el codigo.

.src/types/usersTipes
```
export const TRAER_TODOS = `traer usuarios`;
export const CARGANDO = `cargando`;
export const ERROR = `error`;
```

.src/reducers/usuariosReducers.js
```
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usersTipes'

const INITIAL_STATE = {
	usuarios: [],
	cargando: false,
	error: ''
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODOS:
			return {
				...state,
				usuarios: action.payload,
				cargando:false
			}

		case CARGANDO:
			return { ...state, cargando: true}

		case ERROR:
			return { ...state, error: action.payload, cargando: false}

		default: return state;
	}
}
```

./src/actions/usuariosActions.js
```
import axios from 'axios';

import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usersTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	});

	try {
		const response =await axios.get('https://jsonplaceholder.typicode.com/users');

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	}catch (error){
		console.log('Error: ', error.message);
		dispatch({
			type: ERROR,
			PAYLOAD: error.massage
		})
	}
}
```

.src/components/Usuarios/index.jsx
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component{

  componentDidMount() {

    this.props.traerTodos();
  }

  ponerFilas = () => (
    this.props.usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>
          {usuario.name}
        </td>
        <td>
          {usuario.email}
        </td>
        <td>
          {usuario.website}
        </td>
      </tr>
    ))
  );

  render(){

    console.log(this.props.cargando);
    console.log(this.props.error);

    return(...)
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

// export default connect({Todos los reducers que se necesitaran}, {/Actions})(Usuarios);

export default connect(mapStateToProps, usuariosActions)(Usuarios);
```

Con todo esto tenemos los tres casos obligatorios que debe tener una llamada asincrona: ***cuando carga,*** ***Cuando fue exitoso,*** ***cuando hay un error.***