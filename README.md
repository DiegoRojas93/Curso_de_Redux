# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux

#### Redux Thunk

Redux [Thunk](https://github.com/reduxjs/redux-thunk "thunk") permite a las action creators invertir el control despachando funciones; debido a que si recordamos el archivo ./srs/actions/ususariosActions.js esta exportando una funcion que retorna otra funcion, esto hace que no sea posible pasar informacion a nuestros reducers de nuestro store.

Van a recibir dispatch como argumento y capaz llamarlo asíncronamente. Estas funciones son llamas thunks.

Para usarlo deberemos instalar las siguintes paquetes:

`npm install redux-thunk -S -E`

[![middleware](https://miro.medium.com/max/650/1*z4llp0o7378Wwz4zoRsalw.gif "middleware")](https://medium.com/@ethan.reid.roberts/stuck-in-the-middleware-with-you-c667acb01fc#:~:text=Stuck%20in%20the%20Middleware%20With%20You "middleware")

Ya instalado redux-thunk; lo vamos a aplicar al store como un [middleware](https://platzi.com/blog/como-funciona-redux-thunk/ "middleware") y para aplicar debemos importar otra variable llamada ***aplyMiddleware*** desde redux; para que luego sea agregada como parte de createStore que le pasa como parametro a reduxThunk.

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers/index'

const store = createStore (
  reducers, // Todos los reducers
  {},       // Estado inicial
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} > {/* Intenta proveer un almacenamiento al container APP, es decir que sú store es igual a la constante store ya creada*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

./src/actions/usuariosActions.js
```
import axios from 'axios';

export const traerTodos = () => async (dispatch) => {

	const response =await axios.get('https://jsonplaceholder.typicode.com/users');

	dispatch({
		type: 'traer_usuarios',
		payload: response.data
		// payload: [1, 2, 3]
	})
}
```
./src/components/Usuarios/index.js
```
import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component{

  componentDidMount() {

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

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

// export default connect({Todos los reducers que se necesitaran}, {/Actions})(Usuarios);

export default connect(mapStateToProps, usuariosActions)(Usuarios);
```