# Curso de Redux por Bedu

### ¿Qúe es Redux, cuándo usarlo y por qué?

Redux es un contenedor predecible del estado de aplicaciones JavaScript. Es decir, que es una herramienta de uso libre que nos deja almacenar los estados de cada uno de los componesnte de nuestro proyecto en un solo lugar, su creador es Dan Abramov.

Los principios de Redux son:

- **Almacenamiento:** que los estados se almacenen en un solo lugar.

- **Inmutable: ** que los estados no se sobreescriban y se esten creando unos nuevos.

- **Centralizado:** toda nuestra aplicacion se almacenara en un solo lugar.

Te ayuda a escribir aplicaciones que se comportan de manera consistente, corren en distintos ambientes (cliente, servidor y nativo), y son fáciles de probar.

#### ¿Cuando utilizar Redux?

- **Aplicaciones Grandes:** no es recomendable usar redux en aplicaciones pequeñas, mejor utiliza el estado local para este tipo de aplicaciones.

- **Compartir informacion:** por ejemplo, si necesitas usar la informacion de un usuario en varios o muchos componentes en el que los haya ingresado en un login ó formulario, este seria un buen momento para utilizar Redux.

- **Estados, no formatos:** utilizar y manejar informacion, por ejemplo, usar los colores, fuentes, tamaños, imagenes, etc.