import React from 'react';
import { NavLink } from 'react-router-dom'

const Menu = (props) => (
	<nav id='menu'>
		<NavLink to="/">
			Usuarios
		</NavLink>
		<NavLink to="/tareas">
			Tareas
		</NavLink>
	</nav>
);

export default Menu;