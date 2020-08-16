import React, { Component } from 'react';

class App extends Component{

  constructor() {
    super();
    this.state = {
      users: [
        {
          name: 'Diego',
          mail: 'diegorojas431@gmail.com',
          webSite: 'diegorojas93.github.io'
        },
        {
          name: 'Platzi',
          mail: 'platzi@gmail.com',
          webSite: 'platzi.com'
        }
      ]
    }
  }

  putRow = () => (
    this.state.users.map((user) => (
      <tr>
        <td>
          {user.name}
        </td>
        <td>
          {user.mail}
        </td>
        <td>
          {user.webSite}
        </td>
      </tr>
    ))
  );

  render(){
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
            { this.putRow() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App