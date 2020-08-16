import React from 'react';

const App = () => {
  return(
    <div className="margin">
      <table className="table">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Diego
            </td>
            <td>
              diegorojas431@gmail.com
            </td>
            <td>
              diegorojas93.github.io
            </td>
          </tr>
          <tr>
            <td>
              Platzi
            </td>
            <td>
              platzi@gmail.com
            </td>
            <td>
              platzi.com
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App