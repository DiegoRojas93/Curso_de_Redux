# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Compartir Reducer

Lo que hemos hecho hasta ahora es pasar un parametro por Url, ahora lo que necesitamos es obtener este parametro y mostrar la informacion del usuario.

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions'

class Publicaciones extends Component {

	componentDidMount(){
		if(!this.props.usuarios.lenght){
			this.props.traerTodos()
		}
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Publicaciones de</h1>
				{ this.props.match.params.key }
			</div>
		)
	}
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Publicaciones);
```