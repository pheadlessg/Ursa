import React, { Component } from 'react';
import {Content, Button} from '../GlobalStyle'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    console.log(this.props.parentState.drizzle);
    return (
      <div>
        <Button primary><Link to="/create">Create New Election</Link></Button>
        <Button><Link to="/election-list">Choose an Election</Link></Button>
      </div>);
  }
}

export default Home;
