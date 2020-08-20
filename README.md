# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Deshabilitando botón

Ahora lo que vamos a hacer es una vez que se nuestra tarea se haya guardado en la api, vamos a redireccionar para que se regrese al index de tareas.

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
		const { tareas } = this.props;

		const por_usuario = {
			...tareas[usu_id]
		}

		return Object.keys(por_usuario).map((tar_id)=>(
			<div key={tar_id}>
				<input type="checkbox" defaultChecked={por_usuario[tar_id].completed} />
				{
					por_usuario[tar_id].title
				}
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

.src/components/Tareas/Guardar.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { Redirect } from 'react-router-dom'

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

	deshabilitar = () => {
		const {
			usuario_id,
			titulo,
			cargando
		} = this.props;

		if(cargando){
			return true;
		}

		if (!usuario_id || !titulo) {
			return true;
		}

		return false;
	}

	mostrarAccion = () => {
		const { error, cargando } = this.props;

		if(cargando) {
			return <Spinner />
		}

		if (error) {
			return <Fatal mensaje={error} />
		}
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
					disabled={this.deshabilitar()}
				>
					Guardar
				</button>

				{ this.mostrarAccion()}

			</div>
		)
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Guardar)
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
	AGREGADA
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
			type: AGREGADA
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

.src/reducers/tareasReducer.js
```
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO_ID,
	CAMBIO_TITULO,
	AGREGADA
} from '../types/tareasTypes';

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

		case CAMBIO_USUARIO_ID:
			return { ...state, usuario_id: action.payload }
		
		case CAMBIO_TITULO:
			return { ...state, titulo: action.payload }

		case AGREGADA:
			return { ...state, tareas: {}, cargando: false, error: '' }

		default: return state;
	};
}
```

.src/tipes/tareasTypes.js
```
export const TRAER_TODAS = 'tareas_traer_todas';
export const CARGANDO = 'tareas_cargando';
export const ERROR = 'tareas_error';
export const CAMBIO_USUARIO_ID = 'tareas_cambio_usuario_id'
export const CAMBIO_TITULO = 'tareas_cambio_titulo'
export const AGREGADA = 'tareas_agregada'
```