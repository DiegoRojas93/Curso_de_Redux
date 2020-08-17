# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux

#### Explicación teórica: ciclo completo de Redux

Cuando nuestro componente terminar de cargar (componentDidMount) llama al Action Creator, luego el Action Creator contiene la promesa, trae los datos necesarios y luego va y modifica al Reducer para que actualice el estado usando dispatch() y luego lo actualizamos en el componente con el mapStateToProps.

![Ciclo de vida de Redux en el proyecto](https://i.imgur.com/Uagn0bE.png)

**Si no tenemos estos pasos no nos va a funcionar.**