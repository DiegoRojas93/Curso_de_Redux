# Curso de Redux por Bedu

### Fases de Redux

#### Conexión a un componente

Ahora vamos a conectar un componente a un reducer.


./src/components/usuarios/index.jsx
```
import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux'

class Usuarios extends Component{

  // async componentDidMount(){
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/users')

  //   this.setState({
  //     usuarios: response.data
  //   })
  // }

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

		console.log(this.props)

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

export default connect(mapStateProps, {/*Actions*/})(Usuarios);
```

./src/components/reducers/ususariosReducers.jsx
```
const INITIAL_STATE = {
	usuarios: []
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'traer_usuarios':
			return { ...state, usuarios: action.payload}

			default: return state;
	}
}
```