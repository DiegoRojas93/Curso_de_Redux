import React, { Fragment }from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu'
import Usuarios from './Usuarios/index'

const Tareas = () => <div>Tareas</div>

const App = (props) => (
  <BrowserRouter>
    <Menu />
    <div id="margen">
      <Route exact path='/' component={ Usuarios }/>
      <Route exact path='/tareas' component={ Tareas }/>
    </div>
  </BrowserRouter>
)

export default App;