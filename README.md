# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Estado compartido

Por ahora nos esta sirviendo que se desplegen los comentarios, pero lo que falta es que se muestre un error y se muestre cuando se esta cargando.

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
	traerPorUsuario: publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
} = publicacionesActions;

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
			match: { params: { key } },
			usuariosReducer
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
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];
		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key
		);
	};

	mostrarInfo = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={
					() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
				}
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{
					(publicacion.abierto) ?
						<Comentarios
							comentarios={ publicacion.comentarios }
						/>
						: ''
				}
			</div>
		))
	);

	mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key)
		}
	};

	render() {
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
	abrirCerrar,
	traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

.src/components/Publicaciones/Comentarios.js
```
import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const Comentarios = (props) => {
	if (props.com_error) {
		return <Fatal mensaje={ props.com_error } />
	}

	if (props.com_cargando && !props.comentarios.length) {
		return <Spinner />
	}

	const ponerComentarios = () => (

		props.comentarios.map((comentario) => (
			<li key={ comentario.id }>
				<b>
					<u>
						{ comentario.email }
					</u>
				</b>
				<br />
				{ comentario.body }
			</li>
		))
	);

	return (
		<ul>
			{ ponerComentarios() }
		</ul>
	);
};

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);
```

.src/reducers/publicacionesReducers.js
```
import {
	ACTUALIZAR,
	CARGANDO,
	ERROR,
	COM_ERROR,
	COM_CARGANDO,
	COM_ACTUALIZAR
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: '',
	com_cargando: false,
	com_error: ''
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

		case COM_ACTUALIZAR:
			return {
				...state,
				publicaciones: action.payload,
				com_cargando: false,
				com_error: ''
			};

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case COM_CARGANDO:
			return { ...state, com_cargando: true };

		case COM_ERROR:
			return { ...state, com_error: action.payload, com_cargando: false };

		default: return state;
	};
};
```

.src/types/publicacionesTypes.js
```
export const ACTUALIZAR = 'publicaciones_actualizar';
export const CARGANDO = 'publicaciones_cargando';
export const ERROR = 'publicaciones_error';
export const COM_CARGANDO = 'comentarios_cargando';
export const COM_ERROR = 'comentarios_error';
export const COM_ACTUALIZAR = 'comentarios_actualizar'
```

.src/actions/publicaciones.js
```
import axios from 'axios';

import {
	ACTUALIZAR,
	CARGANDO,
	ERROR,
	COM_ERROR,
	COM_CARGANDO,
	COM_ACTUALIZAR
} from '../types/publicacionesTypes';

import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({
		type: CARGANDO
	});

	let { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const usuario_id = usuarios[key].id;

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
		const nuevas = respuesta.data.map((publicacion) => ({
			...publicacion,
			comentarios: [],
			abierto: false
		}));
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
		};

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles.'
		});
	}
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	};

	const publicaciones_actualizadas = [...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	});
};

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
	dispatch({
		type: COM_CARGANDO
	});

	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

		const actualizada = {
			...seleccionada,
			comentarios: respuesta.data
		};

		const publicaciones_actualizadas = [...publicaciones];

		publicaciones_actualizadas[pub_key] = [
			...publicaciones[pub_key]
		];
		publicaciones_actualizadas[pub_key][com_key] = actualizada;

		dispatch({
			type: COM_ACTUALIZAR,
			payload: publicaciones_actualizadas
		});
	}catch (error) {
		console.log(error.message);
		dispatch({
			type: COM_ERROR,
			payload: 'Comentarios no disponibles.'
		});
	}
};
```

.src/css/index.css
```
#margen {
	margin: 100px;
	margin-top: 50px;
}

.tabla {
	width: 100%;
	text-align: left;
}

.tabla td {
	padding-top: 10px;
	padding-bottom: 10px;
}

#menu {
	background-color: #253A46;
	padding: 20px;
	font-size: 20px;
}

#menu a {
	color: white;
	padding-right: 50px;
}

body {
	margin: 0;
}

.center {
	text-align: center;
}

.rojo {
	color: red;
}

.pub_titulo {
	border-top: 1px solid black;
	cursor: pointer;
}

li {
	margin: 15px 0 15px 0;
}
```