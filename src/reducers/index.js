import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './PublicacionesReducer';

export default combineReducers ({
	usuariosReducer,
	publicacionesReducer
})