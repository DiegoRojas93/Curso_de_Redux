# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Manejar inputs con Reducer

Lo que vamos hacer ahora es poder dependiendo del ususario agregar, quitar ó editar las tareas con la ayuda de los metodpo HTTP. Para hacer esto se debera agregar el ***ususario id*** y el ***Tiyulo*** al reducer de tareas

.src/components/Tareas/Guardar.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {

	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value)
	}

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value)
	}

	render() {
		return (
			<div>
				<h1>Guardar tareas</h1>
				usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId } 
				/>
				<br /><br />
				Titulo:
				<input
					value={ this.props.titulo}
					onChange={ this.cambioTitulo } 
				/>
				<br /><br />
				<button>Guardar</button>
			</div>
		)
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Guardar)
```
.src/reducers/tareasReducer.js
```
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '',
	titulo: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODAS:
			return {
				...state,
				tareas: action.payload,
				cargando: false,
				error: ''
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case 'cambio_Usuario_Id':
			return { ...state, usuario_id: action.payload }
		
		case 'cambio_titulo':
			return { ...state, titulo: action.payload }

		default: return state;
	};
}
```

.src/actions/tareasActions.js

```
import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

		const tareas = {}

		respuesta.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		))

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.'
		})
	}
};

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
	dispatch({
		type: 'cambio_Usuario_Id',
		payload: usuarioId
	})
}

export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: 'cambio_titulo',
		payload: titulo
	})
}
```