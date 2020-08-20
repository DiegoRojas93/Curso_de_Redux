# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Reutilizar componentes

Ya tenemos el ciclo de agregar terminado. Vamos a continuar con el ciclo de evitar y en este vamos a usar la misma forma de que tenemos para agregar.

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

.contenedor_tareas {
	font-size: 20px;
	margin-left: 50px;
	margin-bottom: 70px;
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

.m_left{
	margin-letf: 20px;
}
```
.src/components/Tareas/Guardar.js
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
			cambioTitulo
		} = this.props;

		if ( usu_id && tar_id) {
			const  tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title)
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

export const editar = (tarea_editada) => (dispatch) => {
	console.log(tarea_editada);
}
```