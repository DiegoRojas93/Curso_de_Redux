# Curso de Redux por Bedu

[![Redux](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")](https://i.ibb.co/WH2dzkQ/redux-simple.gif "Redux")

### Fases de Redux

#### Explicación teórica y práctica: ciclo completo de Redux

Cuando nuestro componente terminar de cargar (componentDidMount) llama al Action Creator, luego el Action Creator contiene la promesa, trae los datos necesarios y luego va y modifica al Reducer para que actualice el estado usando dispatch() y luego lo actualizamos en el componente con el mapStateToProps.

![Ciclo de vida de Redux en el proyecto](https://i.imgur.com/Uagn0bE.png)

![# Práctica: ciclo completo de Redux](https://static.platzi.com/media/user_upload/redux-39282628-78b5-4aa6-a9dd-0c9bea87d100.jpg)

**Si no tenemos estos pasos no nos va a funcionar.**