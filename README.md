# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Mapear Objetos

Vamos a agragar el contenido necesario para que se puestra al usuario.

Un objeto Map puede iterar sobre sus elementos en orden de inserción. Un bucle for..of devolverá un array de [clave, valor] en cada iteración.

Cabe destacar que un **Map** el cual es un mapa de un objeto, especialmente un diccionario de diccionarios, solo se va a mapear en el orden de inserción del objeto — el cual es aleatorio y no ordenado.

Un [Object.keys](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys "Object.keys") devuelve un array cuyos elementos son strings correspondientes a las propiedades enumerables que se encuentran directamente en el object. El orden de las propiedades es el mismo que se proporciona al iterar manualmente sobre las propiedades del objeto.

.src/components/Tareas/index.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as tareasActions from '../../actions/tareasActions'

import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

class Tareas extends Component {

	componentDidMount(){
		this.props.traerTodas()
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
		console.log(this.props);
		return (
			<div>
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
```