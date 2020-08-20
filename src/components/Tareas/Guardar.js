import React, { Component } from 'react'

class Guardar extends Component {
	render() {
		return (
			<div>
				<h1>Guardar tareas</h1>
				ususario id:
				<input type='number' />
				<br /><br />
				Titulo:
				<input type="text"/>
				<br /><br />
				<button>Guardar</button>
			</div>
		)
	}
}

export default Guardar