# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Archivos Types

Generalmente siempre vamos a comenter TYPOS (errores al escribir codigo, como por ejemplo: escribir palabras con letras faltantes o en forma desordenada)

Esto es muy importante, debido a que podemos cambiar los types de los actions o cambiar el tipo de caso en el reducer sin darnos cuenta.

Para solucionar esto deberemos crear un archivo llamado ./src/types/usersTipes.js y todo lo que voy a mandar del action al reducer y del reducer al componente lo voy a traer de aqui.

```
export const TRAER_TODOS = `traer_usuarios`
```
Luego lo importaremos a nuestros archivos de actions y reducers


./src/actions/usuariosActions.js
```
import axios from 'axios';

import { TRAER_TODOS } from '../types/usersTipes'

export const traerTodos = () => async (dispatch) => {

	const response =await axios.get('https://jsonplaceholder.typicode.com/users');

	dispatch({
		type: TRAER_TODOS,
		payload: response.data
		// payload: [1, 2, 3]
	})
}
```

./src/reducers/usuariosReducer.js
```
import { TRAER_TODOS } from '../types/usersTipes'

const INITIAL_STATE = {
	usuarios: []
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODOS:
			return { ...state, usuarios: action.payload}

		default: return state;
	}
}
```

**NOTA :** Si en dado caso importas la constante de forma equivocada, el navegador te arrojara una advertencia sobre el caso y sabras lo sucedio.

![Error](https://i.imgur.com/Uagn0bE.png)