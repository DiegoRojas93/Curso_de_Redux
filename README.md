# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Múltiples Reducers

Ya hemos visto como compartir el reducer de un componente a otro componente, pero en el componente publicaciones tambien nececitaremos usar su propio reducer.


.src/components/reducers/publicacionesReducers.js
```
const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: ''
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {

		default: return state;
	}
}
```

.src/components/reducers/index.js
```
import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './PublicacionesReducer';

export default combineReducers ({
	usuariosReducer,
	publicacionesReducer
})
```

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

class Publicaciones extends Component {

	componentDidMount(){
		if(!this.props.usuariosReducer.usuarios.lenght){
			this.props.traerTodos()
		}
	}

	render() {
		...
	}
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
	return {
		usuariosReducer,
		publicacionesReducer
	}
}

const mapDispatchToProps = {
	...usuariosActions,
	...publicacionesActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

.src/actions/publicacionesActions.js
```
import axios from 'axios';

export const traerTodos = () => async (dispatch) => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

	dispatch({
		type: 'traer_todos',
		payload: response.data
	})
}
```