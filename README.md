# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Estado con interacción

Por ahora lo que estamos viendo es que nuestro componente esta enviando al actionCreator el key de publicaciones y el key que vamos a traer,

Ahora lo que vamos a hacer, es que al hacer click a los comentarios o publicaciones del usuario, nos aparezca que esta abierto o cerrado.

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar } = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}

	ponerUsuario = () => {
		const {
			usuariosReducer,
			match: { params: { key } }
		} = this.props;

		if (usuariosReducer.error) {
			return <Fatal mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />
		}

		const nombre = usuariosReducer.usuarios[key].name;

		return (
			<h1>
				Publicaciones de { nombre }
			</h1>
		);
	};

	ponerPublicaciones = () => {

		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!usuarios.length) return;

		if (usuariosReducer.error) return;

		if (publicacionesReducer.cargando) {
			return <Spinner />
		}

		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}

		if (!publicaciones.length) return;

		if (!('publicaciones_key' in usuarios[key])) return;

		const{ publicaciones_key } = usuarios[key];

		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key
		)
	}

	mostrarInfo = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				className="pub_titulo"
				key= { publicacion.id }
				onClick={ () => this.props.abrirCerrar(pub_key, com_key) }
				>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{
					(publicacion.abierto) ? 'abierto' : 'cerrado'
				}
			</div>
		))
	);
	render() {
		console.log(this.props);
		return (
			<div>
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario,
	abrirCerrar
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

./src/actions/publicacionesActions.js
```
import axios from 'axios';
import {
	CARGANDO,
	ERROR,
	ACTUALIZAR
} from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {

	dispatch({
		type: CARGANDO
	});

	const { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const usuario_id = usuarios[key].id;

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

		const nuevas = respuesta.data.map((publicacion) => ({
			...publicacion,
			comentarios: [],
			abierto: false
		}))

		const publicaciones_actualizadas = [
			...publicaciones,
			nuevas
		];

		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas
		});

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		}

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});

	} catch (error) {
		console.log(error.message);

		dispatch({
			type: ERROR,
			payload: 'publicaciones no disponibles'
		});
	}

};

export const abrirCerrar = (pub_key, com_key) => (dispatch,getState) => {

	const { publicaciones} = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	}

	const publicaciones_actualizadas = [ ...publicaciones ];
	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];

	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	});
}
```

.src/reducers/publicacionesReducers.js
```
import {
	CARGANDO,
	ERROR,
	ACTUALIZAR
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTUALIZAR:
			return {
				...state,
				publicaciones: action.payload,
				cargando: false,
				error: ''
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		default: return state;
	};
};
```

.src/types/publicacionesTypes.js
```
export const ACTUALIZAR = 'publicaciones_actualizar';
export const CARGANDO = 'publicaciones_cargando';
export const ERROR = 'publicaciones_error';
```