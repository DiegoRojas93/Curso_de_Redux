# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Mapear Objetos

Lo que vamos hacer ahora es agregar un boton que nos vaya a mandar a un componente nuevo para dar de alta a una tarea.

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
.src/components/Tareas/Guardar.css
```
import React, { Component } from 'react'

class Guardar extends Component {
	render() {
		return (
			<div>
				<h1>Guardar tareas</h1>
				ususario id:
				<input type='number' />
				<br /><br />
				Titulo:
				<input type="text"/>
				<br /><br />
				<button>Guardar</button>
			</div>
		)
	}
}

export default Guardar
```
.src/components/Tareas/App.css
```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import Publicaciones from './Publicaciones';
import Tareas from './Tareas/index'
import TareasGuardar from './Tareas/Guardar'

const App = (props) => (
	<BrowserRouter>
		<Menu />
		<div id="margen">
			<Route exact path='/' component={Usuarios} />
			<Route exact path='/tareas' component={Tareas} />
			<Route exact path='/publicaciones/:key' component={Publicaciones} />
			<Route exact path='/tareas/guardar' component={TareasGuardar} />
		</div>
	</BrowserRouter>
);

export default App;
```