# Curso de Redux por Bedu

### Fases de Redux

#### Actions Creators

Ahora lo que vamos ahacer es traer la informacion a nuestro componente, esto lo hacemos con los ***Action Creators***

./src/actions/usuariosActions.js
```
export const traerTodos = () => (dispatch) => { // el dispatch es el que va disparar la llamada y es el que va a contactar al reducer para que haca el cambio de estado

	dispatch({
		type: 'traer_usuarios',
		payload: [1,2,3]
	})
}
```

./src/components/Usuarios.index.jsx
```
import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions'

class Usuarios extends Component{

  componentDidMount(){
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users')

    // this.setState({
    //   usuarios: response.data
    // })

    this.props.traerTodos();
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

    console.log(this.props);

    return(
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
            { this.ponerFilas() }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateProps = (reducers) => {
  return reducers.usuariosReducers
}

// export default connect({Todos los reducers que se necesitaran}, {/Actions})(Usuarios);

export default connect(mapStateProps, {usuariosActions})(Usuarios);
```