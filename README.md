# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Modificando respuesta de url

Ya que sabemos de qué publicacion vamos a traer los comentarios.

Ahora vamos a hacerlo de una manera diferente. Por ahorita lo  que tenemos es un usuariosReducer y publicacionesReducer, en donde le decimos al ususario que en cierta casilla estan sus publicaciones.

En esta nueva manera los que vamos a hacer es que es sus publicaciones se le añadiran sus comentarios de forma dinamica.

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

./src/actions/usuariosActions.js
```
import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

export const traerTodos = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
		dispatch({
			type: TRAER_TODOS,
			payload: respuesta.data
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de usuario no disponible'
		})
	}
};
```

./src/actions/publicacionesActions.js
```
import axios from 'axios';
import {
	CARGANDO,
	ERROR,
	TRAER_POR_USUARIO
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
			type: TRAER_POR_USUARIO,
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

export const abrirCerrar = (pub_key, com_key) => (dispatch) => {
	console.log(pub_key, com_key);
}
```