# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### DELETE

Ahora lo que vamos a hacer es que al boton de eliminar, haga la accion de eliminar las tareas de los usuarios, luego limpiar las tareas para poder recargar la pagina y ver cual fue la terea que se elimino.

**Nota:** recuerda que el url no tine una base de datos real, por ello no sera posible eliminar un dato del listado de tareas.

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
		console.log(this.props.tareas);
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

export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	})

	try {
		const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);

		console.log(respuesta);

		dispatch({
			type: TRAER_TODAS,
			payload: {}
		})
	} catch (error) {
		console.log(error.message);
		dispatch({
			type:ERROR,
			payload: 'Servicio no disponible'
		});
	}
}
```