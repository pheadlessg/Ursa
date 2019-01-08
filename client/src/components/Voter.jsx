import React, { Component } from 'react';

class Voter extends Component {
  render() {
    return (
      <div>
        Vote for Applegate 2020
        <button onClick={() => console.log('clicked!')}>vote</button>
      </div>
    );
  }
}

export default Voter;
