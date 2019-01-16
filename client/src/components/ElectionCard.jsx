import React, { Component } from 'react';

class ElectionCard extends Component {
  render() {
    return (
      <div>
        <button>Election Name: {this.props.electionid.electionName}</button>
      </div>
    );
  }
}

export default ElectionCard;
