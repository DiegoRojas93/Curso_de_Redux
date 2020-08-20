# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Post

Ahora lo que necesitamos es hacer ya la acción para poder guardar la informacion a la base de datos de la [api.](https://jsonplaceholder.typicode.com/todos "api")

Recuerda este url no tiene una base de datos real, solo es para poder hacer este ejercicio.

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

	guardar = () => {
		const { usuario_id, titulo, agregar } = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			tittle: titulo,
			completed: false
		}

		agregar(nueva_tarea)
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
				<button
					onClick={ this.guardar }
				>Guardar</button>
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

		case 'agregada':
			return { ...state, tareas: {}, cargando: false, error: '' }

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


export const agregar = (nueva_tarea) => async (dispatch) => {

	dispatch({
		type:CARGANDO
	})

	try {
		const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)

		console.log(respuesta.data);

		dispatch({
			type: 'agregada'
			
		})

	}catch(error){
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde.'
		})
	}
}
```

**Nota:** Podemos usar ***fetch*** en vez de Axios, para hacer el metodo POST.

EJEMPLO

```
const data = await fetch("https://jsonplaceholder.typicode.com/todos", { 
					method: 'POST', 
					headers: {
							'Content-Type': 'application/json'
					},
					body: JSON.stringify(newTask)
			}
	).then(response => response.json())
```