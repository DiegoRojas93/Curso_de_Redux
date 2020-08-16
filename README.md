# Curso de Redux por Bedu

## Ciclo de vida de React

Tenemos 4 fases por los que un componente pasa:

1. **Initialization:** Declaramos nuestro estado o propiedades
2. **Mounting:** Todo componente debe tener render. Es obligatorio.
3. **Updation**
4. **Unmounting:** Solo hay una función en caso de que queramos hacer algo cuando se destruya un componente

Para esta clase vamos a instalar axios el cual nos perminte usar todos los metodos de HTTP: GET, POST PUT, DELET, etc.

Para ello deberemos instalar el sigiente paquete:

`mpm install axios -S -E`

Para usarlo deberemos importar el paquete en el componente

`import axios from 'axios'`

luego deberemos traelo en el **componentDidMount.***

**Nota:** recuerda que axios es un paquete que se comporta como una funcion asinciona, para ello debemos cambiar el componentDidMount como una funcion asincrona para que pueda esperar a que llegue la respuesta de axios.

```
async componentDidMount(){
	const response = await axios.get('https://jsonplaceholder.typicode.com/users')

	console.log('response', response);

	this.setState({
		users: [
			{
				id: 1,
				name: 'Diego',
				mail: 'diegorojas431@gmail.com',
				webSite: 'diegorojas93.github.io'
			},
			{
				id: 2,
				name: 'Platzi',
				mail: 'platzi@gmail.com',
				webSite: 'platzi.com'
			}
		]
	})
}
```