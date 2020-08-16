# Curso de Redux por Bedu

## Ciclo de vida de React

Una Promesa es un proxy para un valor no necesariamente conocido en el momento que es creada la promesa.

Las promesas tienen tres estados:

- pending
- fullfilled
- rejected

Las promesas se invocan de la siguiente forma:

```
new  Promise( ( resolve, reject ) => {
// --- llamado asíncrono
        if( todoOK ) {
        // -- se ejecutó el llamado exitosamente resolve() }
        else {
        // -- hubo un error en el llamado reject()
        }
} )
```