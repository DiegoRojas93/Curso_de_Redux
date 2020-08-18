# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Llamando a múltiples reducers en una acción

En la clase enterior tenemos un error muy commun que pasa; **ESTAMOS LLAMANDO UNA ACCION Y MODIFICA ALGO QUE NO DEBERIA** es decir que la constante ***mapDispactToProps*** tinene ususariosActions y a publicaccionesAction; cada uno de estos achivos estan exportando una funcion con el mismo nombre ***traerTodos***.

Esto quiere decir que la ultimo contenido de ***mapDispactToProps*** recibira los cambios ó actualizaciones a las peticiones que se hagan.


Para ello deberemos corrgir nuestros archivos:

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'


const { traerTodos: usuariosTraerTodos} = usuariosActions;
const { traerTodos: publicacionesTraerTodos} = publicacionesActions;

class Publicaciones extends Component {

	componentDidMount(){
		if(!this.props.usuariosReducer.usuarios.lenght){
			this.props.usuariosTraerTodos();
		}
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Publicaciones de</h1>
				{ this.props.match.params.key }
			</div>
		)
	}
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
	return {
		usuariosReducer,
		publicacionesReducer
	}
}

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

.src/actions/publicacionesActions.js
```
import axios from 'axios';

import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	})

	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	} catch (error) {
		console.log(`Error`, error.massage);
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal, intente más tarde.'
		})
	}
}
```

.src/components/reducers/publicacionesReducers.js
```
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTipes'

const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: ''
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {

		case TRAER_TODOS:
			return {
				...state,
				publicaciones: action.payload,
				cargando: false
			}

		case CARGANDO:
			return { ...state, cargando: true}

		case ERROR:
			return { ...state, error: action.payload, cargando: false}

		default: return state;
	}
}
```

.src/components/types/usersTipes.js
```
export const TRAER_TODOS = `usuarios_traer usuarios`;
export const CARGANDO = `usuarios_cargando`;
export const ERROR = `usuarios_error`;
```

.src/components/types/publicacionesTipes.js
```
export const TRAER_TODOS = `publicaciones_traer usuarios`;
export const CARGANDO = `publicaciones_cargando`;
export const ERROR = `publicaciones_error`;
```

./src/actions/publicacionesActions.js
```
import axios from 'axios';

import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	})

	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	} catch (error) {
		console.log(`Error`, error.massage);
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal, intente más tarde.'
		})
	}
}
```