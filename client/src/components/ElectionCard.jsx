import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../GlobalStyle'


class ElectionCard extends Component {
  render() {
    return (
      <div>
        <Button>
          <Link to={{pathname: `/vote/${this.props.electionid[3]}`}}>
          Election Name: {this.props.electionid.electionName}
          </Link>
        </Button>
      </div>
    );
  }
}

export default ElectionCard;
