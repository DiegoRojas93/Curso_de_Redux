import axios from 'axios';

export const traerTodos = () => async (dispatch) => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

	dispatch({
		type: 'traer_todos',
		payload: response.data
	})
}