# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Evitar segundas búsquedas

Hay un problema, cuando buscamos un usuario para ver sus publicaciones y luego nos devolvemos en la pagina para buscar las publicaciones de otro usuario, **En el reducer se van a sobreescribir las publicaciones de la busqueda anterior.**

Para evitarlo debemos hacer lo siguiente:

.src/actions/publicacionesActions.js
```
import axios from 'axios';

import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTipes'

export const traerPorUsuario = (key) => async (dispatch,getState) => {

	const { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;

	const usuario_id = usuarios[key].id;

	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	const publicaciones_actualizadas = [
		...publicaciones,
		response.data
	];


	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	})
}
```

.src/types/publicacionesTipes.js
```
export const TRAER_POR_USUARIO = `publicaciones_traer_por_usuario`;
export const CARGANDO = `publicaciones_cargando`;
export const ERROR = `publicaciones_error`;
```

.src/reducer/reducers/PublicacionesReducers.js
```
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTipes'

const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: ''
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {

		case TRAER_POR_USUARIO:
			return {
				...state,
				publicaciones: action.payload,
				cargando: false,
				error: ''
			}

		case CARGANDO:
			return { ...state, cargando: true}

		case ERROR:
			return { ...state, error: action.payload, cargando: false}

		default: return state;
	}
}
```

.src/components/Usuarios/index.js
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner'
import NotFound from '../General/NotFound'
import Tabla from './Tabla'

class Usuarios extends Component{

  componentDidMount() {

    if(!this.props.usuarios.lenght){
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {

    if(this.props.cargando){
      return <Spinner />;
    }

    if(this.props.error){
      return <NotFound mensaje={this.props.error}/>;
    }

    return <Tabla />

  }


  render(){

    console.log(this.props);

    return(
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

// export default connect({Todos los reducers que se necesitaran}, {/Actions})(Usuarios);

export default connect(mapStateToProps, usuariosActions)(Usuarios);
```