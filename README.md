# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Tabla como componente

Estaves vamos a arregar nuestro archivo JSX para mejorar la presentacion de este componente; usando Redux para pasar los datos de la API al componente Tabla.

.src/components/Usarios/index.jsx
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner'
import NotFound from '../General/NotFound'
import Tabla from './Tabla'

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

    return <Tabla />

  }


  render(){

    console.log(this.props.cargando);
    console.log(this.props.error);

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

.src/components/Usarios/index.jsx
```
import React from 'react';

import { connect } from 'react-redux'

const Tabla = (props) => {

	const ponerFilas = () => props.usuarios.map((usuario) => (
		<tr key={usuario.id}>
			<td>
				{usuario.name}
			</td>
			<td>
				{usuario.email}
			</td>
			<td>
				{usuario.website}
			</td>
		</tr>
	));

	return (
		<div>
		<table className="tabla">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
      </table>
	</div>
	)
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla)
```