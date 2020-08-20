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

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
	dispatch({
		type: 'cambio_Usuario_Id',
		payload: usuarioId
	})
}

export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: 'cambio_titulo',
		payload: titulo
	})
}