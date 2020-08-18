# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### Parámetros por URL

Ahora lo que vamos a hacer, es que al hacer un click a un usuario se muestre las publicaciones que este a creado ó tiene.

.src/components/app.js
```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Usuarios from './Usuarios/index';
import Publicaciones from './Publicaciones/index.js';

const Tareas = () => <div>Tareas</div>

const App = (props) => (
  <BrowserRouter>
    <Menu />
    <div id="margen">
      <Route exact path='/' component={ Usuarios }/>
      <Route exact path='/tareas' component={ Tareas }/>
      <Route exact path='/publicaciones/:key' component={ Publicaciones }/>
    </div>
  </BrowserRouter>
)

export default App;
```

[cssicon](https://cssicon.space/#/ "cssicon")

.src/components/Usuarios/Tabla.js
```
import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

const Tabla = (props) => {

	const ponerFilas = () => props.usuarios.map((usuario, key) => (
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
			<td>
				<Link to={ `/publicaciones/${key}` }>
					<div className="eye-solid icon"></div>
				</Link>
			</td>
		</tr>
	));

	return (
		...
	)
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla)
```

.src/components/css.iconos.css

```
.eye-solid.icon {
  color: #000;
  /* position: absolute; */
  margin-left: 3px;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  border-radius: 70% 15%;
  border: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.eye-solid.icon:before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: solid 1px currentColor;
  background-color: currentColor;
}
```

.src/components/Publicaciones/index.js
```
import React, { Component } from 'react'

class Publicaciones extends Component {
	render() {
		return (
			<div>
				{ this.props.match.params.key }
			</div>
		)
	}
}

export default Publicaciones;
```

** Match** es para que si la ruta coincide exactamente si redireccione a ese componente/vista
** Params** son los parametros o variables que puedes enviar desde la URL

Referencia: [usage-with-react-router](https://redux.js.org/advanced/usage-with-react-router/ "usage-with-react-router")