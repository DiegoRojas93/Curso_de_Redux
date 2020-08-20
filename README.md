# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Redireccionar

Ya importamos nuestra etiqueta de redireccionar. Ahora, vamos a utilizarla para que veamos cómo funciona y como nos va a ayudar en nustro proyecto.

Con esto estamos haciendo el ciclo completo de cuando se guarda los nuevos datos, voy a limpiar las tareas en el reducer, se buscan nuevamente y se lipia el formulario.

.src/components/Tareas/Guardar.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as tareasActions from '../../actions/tareasActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

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

		case AGREGADA:
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
