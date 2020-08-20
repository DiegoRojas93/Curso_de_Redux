# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### PUT

Hemos encontrado un error al recargar la pagina de editar tareas, esto se debe a que la pagina quiere traer una tarea que todavia no exite; esto se arreglara.

Tambien vamos a trabajar a que los checks de la pagina tareas no se borren al pasar entre paginas

.src/components/Tareas/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as tareasActions from '../../actions/tareasActions'

import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

class Tareas extends Component {

	componentDidMount(){
		if(!Object.keys(this.props.tareas).length){
			this.props.traerTodas()
		}
	}

	mostrarContenido = () => {

		const { tareas, cargando, error } = this.props;


		if(cargando) {
			return <Spinner />
		}

		if(error) {
			return <Fatal mensaje={error} />
		}

		return Object.keys(tareas).map((usu_id) => (
			<div key={usu_id}>
				<h2>
					Usuario {usu_id}
				</h2>
				<div className="contenedor_tareas">
					{ this.ponerTareas(usu_id)}
				</div>
			</div>
		))
	}

	ponerTareas = (usu_id) => {
		const { tareas, cambioCheck } = this.props;

		const por_usuario = {
			...tareas[usu_id]
		}

		return Object.keys(por_usuario).map((tar_id)=>(
			<div key={tar_id}>
				<input
					type="checkbox"
					defaultChecked={por_usuario[tar_id].completed}
					onChange={() => cambioCheck(usu_id, tar_id)}
				/>
				{
					por_usuario[tar_id].title
				}
				<button className="m_left">
					<Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
						Editar
					</Link>
				</button>
				<button className="m_left">
					Eliminar
				</button>
			</div>
		))
	}

	render() {
		return (
			<div>
				<button>
					<Link to='/tareas/guardar'>
						Agregar
					</Link>
				</button>
				{ this.mostrarContenido() }
			</div>
		)
	}
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas)
```

.src/actions/tareasActions.js
```
import axios from 'axios';
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO_ID,
	CAMBIO_TITULO,
	GUARDAR,
	ACTUALIZAR
} from '../types/tareasTypes';

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
		type: CAMBIO_USUARIO_ID,
		payload: usuarioId
	})
}

export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
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
			type: GUARDAR
		})

	}catch(error){
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde.'
		})
	}
}

export const editar = (tarea_editada) => async (dispatch) => {

	dispatch({
		type:CARGANDO
	})

	try {
		const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)

		console.log(respuesta.data);

		dispatch({
			type: GUARDAR
		})

	}catch(error){
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde.'
		})
	}
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};

	actualizadas[usu_id] = {
		...tareas[usu_id]
	}

	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
}
```
.src/reducers/tareasReducer.js
```
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO_ID,
	CAMBIO_TITULO,
	GUARDAR,
	ACTUALIZAR
} from '../types/tareasTypes';

const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '',
	titulo: '',
	regresar: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODAS:
			return {
				...state,
				tareas: action.payload,
				cargando: false,
				error: '',
				regresar: false
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case CAMBIO_USUARIO_ID:
			return { ...state, usuario_id: action.payload }

		case CAMBIO_TITULO:
			return { ...state, titulo: action.payload }

		case ACTUALIZAR:
			return { ...state, tareas: action.payload }

		case GUARDAR:
			return {
				...state,
				tareas: {},
				cargando: false,
				error: '',
				regresar: true,
				usuario_id: '',
				titulo: ''
			}

		default: return state;
	};
}
```

.src/types/tareasTypes.js
```
export const TRAER_TODAS = 'tareas_traer_todas';
export const CARGANDO = 'tareas_cargando';
export const ERROR = 'tareas_error';
export const CAMBIO_USUARIO_ID = 'tareas_cambio_usuario_id'
export const CAMBIO_TITULO = 'tareas_cambio_titulo'
export const AGREGADA = 'tareas_agregada'
export const GUARDAR= 'tareas_guardar'
export const ACTUALIZAR= 'tareas_Actualizar'
```

[Inmutabilidad](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#correct-approach-copying-all-levels-of-nested-data "Inmutabilidad")