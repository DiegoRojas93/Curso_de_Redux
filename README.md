# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux extras

Este modulo vamos a aprender typs **Extras** que nos ayudaran a implementar a desarrollar aplicaciones con redux sin fallar en el intento.

#### Try Catch

Otro caso muy commun es intentar adividar que problema se presento cuando se llema a una api o a tro servicio que intentamos requerir.

Para ello deberemos usar el **Try Catch** para darnos adventencias sobre errores en la peticion. Por ejemplo si escribimos una url de una api de forma equivocada.

```
import axios from 'axios';

import { TRAER_TODOS } from '../types/usersTipes'

export const traerTodos = () => async (dispatch) => {

	try {
		const response =await axios.get('https://jsonplaceholder.typicode.com/users');

		dispatch({
			type: TRAER_TODOS,
			payload: response.data
		})
	}catch (error){
		console.log('Error: ', error.message);
	}
}
```

***try*** permite definir un bloque de código para que se analice en busca de errores mientras se ejecuta.

***catch*** permite definir un bloque de código para ejecutarse, si se produce un error en el bloque try.

```
try {
// Bloque de código a intentar
}
catch(Exception _e_) {
// Bloque de código para manejar errores
}
```