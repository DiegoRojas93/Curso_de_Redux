# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Uso del estado en la acción

Ahora lo que vamos hacer ya traido el usuario, es traer todas las publicaciones del ususario escogido.


.src/components/reducers/ususariosReducer.js
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
				cargando: false,
				error: ''
			}

		case CARGANDO:
			return { ...state, cargando: true}

		case ERROR:
			return { ...state, error: action.payload, cargando: false}

		default: return state;
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
				cargando: false,
				error: ''
			}

		case CARGANDO:
			return { ...state, cargando: true}

		case ERROR:
			return { ...state, error: action.payload, cargando: false}

		default: return state;
	}
}
```

Esta parte es muy inportante debido a que podemos pasar el key del ususario que escogimos para poder llamar la data (en este caso la publicaciones hechas por el ususario)

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

export const traerPorUsuario = (key) => async (dispatch,getState) => {

	const { usuarios } = getState().usuariosReducer;

	const usuario_id = usuarios[key].id;

	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
}
```

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'


const { traerTodos: usuariosTraerTodos} = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario} = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount(){
		if(!this.props.usuariosReducer.usuarios.lenght){
			await this.props.usuariosTraerTodos();
		}

		this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
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
	publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```