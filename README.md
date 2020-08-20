# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Últimos detalles

Por ultimo a eliminar todos los ***console.log*** de todos los archivos, luego vamos a mejorar el codigo de la pagina Tareas solamente se corra una vez, que es cuando no se esá cargando y cuando no hay ninguna tarea.

Por ultimo vamos a mejorar el código para que cuando queramos editar la tarea de un usuario, y nos cambiemos de ruta sin guardar los datos, el formulario quede nuevamente vacio cuando volvamos a editar la tarea.

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

	componentDidUpdate() {

		const { tareas, cargando, traerTodas } = this.props

		if(!Object.keys(tareas).length && !cargando){
			traerTodas()
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
		const { tareas, cambioCheck, eliminar } = this.props;

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
				<button className="m_left" onClick={ () => eliminar(tar_id) }>
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
	ACTUALIZAR,
	LIMPIAR
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

		dispatch({
			type: GUARDAR
		})

	}catch(error){

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

		dispatch({
			type: GUARDAR
		})

	}catch(error){

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

export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	})

	try {
		const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);

		dispatch({
			type: TRAER_TODAS,
			payload: {}
		})
	} catch (error) {
		dispatch({
			type:ERROR,
			payload: 'Servicio no disponible'
		});
	}
}

export const limpiarForma = () => (dispatch) => {
	dispatch({
		type: LIMPIAR
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
	ACTUALIZAR,
	LIMPIAR
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

		case ACTUALIZAR:
			return { ...state, tareas: action.payload }

		case LIMPIAR:
			return {...state, usuario_id: '', titulo: ''}

		default: return state;
	};
}
```

.src/components/Tareas/Guardar,js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as tareasActions from '../../actions/tareasActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

class Guardar extends Component {

	componentDidMount(){
		const {
			match: { params: {usu_id, tar_id} },
			tareas,
			cambioUsuarioId,
			cambioTitulo,
			limpiarForma
		} = this.props;

		if ( usu_id && tar_id) {

			const  tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title)

		}else{
			limpiarForma();
		}
	}

	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value)
	}

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value)
	}

	guardar = () => {
		const {
			match: { params: {usu_id, tar_id} },
			tareas,
			usuario_id,
			titulo,
			agregar,
			editar
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			tittle: titulo,
			completed: false
		}

		if (usu_id && tar_id) {

			const tarea = tareas[usu_id][tar_id]
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			}
			editar(tarea_editada)

		}else{
			agregar(nueva_tarea)
		}

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
				{
					(this.props.regresar) ? <Redirect to='/tareas' /> : ''
				}
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
export const LIMPIAR= 'tareas_limpiar'
```

Hemos terminado finalmente con el uso de Redux en nuestro proyecto, aplicando las mejores prácticas y métodos HTTP como GET, POST, PUT y DELETE.