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