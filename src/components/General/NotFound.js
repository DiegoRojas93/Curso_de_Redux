import React from 'react';

const NotFound = (props) => (
	<div>
		<h1 className="center rojo">Not Found 404</h1>
		<h3 className="center black">{props.mensaje}</h3>
	</div>
)

export default NotFound