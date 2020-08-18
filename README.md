# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Compartir información en Redux

A partir de este módulo aprenderemos a usar Redux de una forma más avanzada, como lo es compartir recucers, comprender la inmutabilidad, actualizar información dinámicamente y manejar diferentes ***reducers.***

#### [Inmutabilidad](https://medium.com/@khriztianmoreno/qu%C3%A9-es-la-inmutabilidad-263bdfe3fa1b "Inmutabilidad")

Hasta este momento ya podemos ir a trear nuestras publicaciones y añadirlas al arreglo de publicaciones que tenemos ahorita para convertir un arreglo de arreglos.

Lo que nos falta ahora es una vez que trajimos esas publicaciones, Decirle al usuariosReducer. "Tus publicaciones están en este en esta casilla del arreglo, que es lo que vamos a ver acontinuación"

.src/actions/publicacionesActions.js
```
import axios from 'axios';

import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTipes';
import * as usuariosTypes from '../types/usersTipes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch,getState) => {

	const { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;

	const usuario_id = usuarios[key].id;

	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	const publicaciones_actualizadas = [
		...publicaciones,
		response.data
	];

	const publicaciones_key = publicaciones_actualizadas.length -1;

	const usuarios_actualizados = [...usuarios];

	usuarios_actualizados[key] = {
		...usuarios[key],
		publicaciones_key
	}

	dispatch({
		type: USUARIOS_TRAER_TODOS,
		payload: usuarios_actualizados
	})

	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	})
}
```