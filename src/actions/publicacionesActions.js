import axios from 'axios';

import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTipes'

export const traerTodos = () => async (dispatch) => {

	dispatch({
		type: CARGANDO
	})

	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	} catch (error) {
		console.log(`Error`, error.massage);
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal, intente más tarde.'
		})
	}
}

export const traerPorUsuario = (key) => async (dispatch,getState) => {

	const { usuarios } = getState().usuariosReducer;

	const usuario_id = usuarios[key].id;

	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
}