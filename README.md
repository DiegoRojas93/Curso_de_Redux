# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Validación compuesta

Ya podemos ver las publicaciones del usuario en la consola, lo que hace falta es desplicar sus publicaciones en la pantalla.

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}

	ponerUsuario = () => {
		const {
			usuariosReducer,
			match: { params: { key } }
		} = this.props;

		if (usuariosReducer.error) {
			return <Fatal mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />
		}

		const nombre = usuariosReducer.usuarios[key].name;

		return (
			<h1>
				Publicaciones de { nombre }
			</h1>
		);
	};

	ponerPublicaciones = () => {

		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!usuarios.length) return;

		if (usuariosReducer.error) return;

		if (publicacionesReducer.cargando) {
			return <Spinner />
		}

		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}

		if (!publicaciones.length) return;

		if (!('publicaciones_key' in usuarios[key])) return;

		const{ publicaciones_key } = usuarios[key];

		return publicaciones[publicaciones_key].map((publicacion) => (
			<div className="pub_titulo">
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
			</div>
		))
	}

	render() {
		console.log(this.props);
		return (
			<div>
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

./src/css/index.css
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
}
```