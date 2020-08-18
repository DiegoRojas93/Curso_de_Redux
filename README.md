# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Componente Not Found

Por regla general debemos advertirle al usuario que si la peticion a una base de datos o a una api fallo en su respuesta se le muestre un mensaje a su pantalla, para ello debemos crear un componente con sus estilos para ser mostrados.

.src/components/Usarios/index.jsx
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner'
import NotFound from '../General/NotFound'

class Usuarios extends Component{

  componentDidMount() {

    this.props.traerTodos();
  }

  ponerContenido = () => {

    if(this.props.cargando){
      return <Spinner />;
    }

    if(this.props.error){
      return <NotFound mensaje={this.props.error}/>;
    }


    return (
			...
    )
  }

  ponerFilas = () => (
		...
  );

  render(){

    console.log(this.props.cargando);
    console.log(this.props.error);

    return(
      <div>
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

.src/components/General/NotFound.js
```
import React from 'react';

const NotFound = (props) => (
	<div>
		<h1 className="center rojo">Not Found 404</h1>
		<h3 className="center black">{props.mensaje}</h3>
	</div>
)

export default NotFound
```
.src/actions/usuariosActions.js
```
import axios from 'axios';

import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usersTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	});

	try {
		const response =await axios.get('https://jsonplaceholder.typicode.com/userss');

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	}catch (error){
		console.log('Error: ', error.message);
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal, intente mas tarde.'
		})
	}
}
```