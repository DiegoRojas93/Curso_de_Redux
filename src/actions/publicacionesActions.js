import axios from 'axios';

import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTipes'

export const traerPorUsuario = (key) => async (dispatch,getState) => {

	const { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;

	const usuario_id = usuarios[key].id;

	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	const publicaciones_actualizadas = [
		...publicaciones,
		response.data
	];


	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	})
}