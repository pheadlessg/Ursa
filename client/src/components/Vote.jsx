import React, { Component } from 'react';
import {Content, Button} from '../GlobalStyle'
import {Link} from 'react-router-dom'

class Vote extends Component {
  render() {
    console.log(this.props.parentState.drizzle);
    return (
      <div>
       VOTE
      </div>);
  }
}

export default Vote;
