import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner'
import NotFound from '../General/NotFound'
import Tabla from './Tabla'

class Usuarios extends Component{

  componentDidMount() {

    if(!this.props.usuarios.lenght){
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {

    if(this.props.cargando){
      return <Spinner />;
    }

    if(this.props.error){
      return <NotFound mensaje={this.props.error}/>;
    }

    return <Tabla />

  }


  render(){

    console.log(this.props);

    return(
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

// export default connect({Todos los reducers que se necesitaran}, {/Actions})(Usuarios);

export default connect(mapStateToProps, usuariosActions)(Usuarios);