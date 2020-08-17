# Curso de Redux por Bedu

### Introducción: las fases de Redux

#### Los cuatro pilares de Redux son:

- **Store:* Almacenamiento; es el principal pilar de todo Redux, debido a que ahí se almacenara todo lo que necesitamos, toda la información.

- **Reducers:* Estados; dependiendo del componente, es la informacion que vamos a tener, por ejemplo, el reducers del componente de usuarios, es el que va a tener el estado(la informacion) de cada uno de los usuarios y se los va entregar al almacenamiento.

- **Actions Creators:* Funciones; son todas las funciones que se llamans para pedir informacion que generamente son promesas.

- **Componente:* codigo JSX; son el codigo JSX que vemos renderizado en pantalla.

#### ¿Como funciona?

**Componente** => se comunica con el => **Action Creators** => da la informacion al => **Reducers** => Una vez actualizado el reducers, la informacion regresa al estado del=> **Componente:**

El DOM va a saber que cambiar de por las actualizaciones que hace el compoente y por su puesto el virtualDOM

**EL CORAZON DE REDUX ES SU ALMACENAMIENTO DE ESTADO GLOBAL**