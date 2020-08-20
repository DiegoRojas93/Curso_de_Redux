# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Nuevo ciclo Redux

vamos a dar un vistazo al [jsonplaceholder](https://jsonplaceholder.typicode.com/todos "jsonplaceholder") que muestra las tareas de los usuarios.

Lo que vamos hacer es separar las tareas por usuarios y por id; normalizando asi los datos de la API obneniendo asi un objeto llamadado tareas.

.src/actions/tareasActions.js
```
import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

		const tareas = {}

		respuesta.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		))

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.'
		})
	}
};
```