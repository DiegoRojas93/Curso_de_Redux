# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Componente Spinner

Podemos hacer un loading cuando los datos de la api esta cagando, con el fin de informarle al usuario que esta cargando la informacion.


.src/components/Usuarios/index.js
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner'

class Usuarios extends Component{

  componentDidMount() {

    this.props.traerTodos();
  }

  ponerContenido = () => {

    if(this.props.cargando){
      return < Spinner/>;
    }
    return (
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
            { this.ponerFilas() }
          </tbody>
        </table>
    )
  }

  ponerFilas = () => (
    this.props.usuarios.map((usuario) => (
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
    ))
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

.src/General/Spinner.js
```
import React from 'react';
import '../../css/spinner.css'

const Spinner = (props) => (
	<div className="center">
		<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
	</div>
)

export default Spinner
```

.src/css/spinner.css
[loading.io](https://loading.io/css "loading.io")
```
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #253a46;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

.src/css/spinner.css
```
#margen {
  margin: 100px;
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
  background-color: #253a46;
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

.center{
	text-align: center;
}
```