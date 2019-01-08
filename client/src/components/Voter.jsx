import React, { Component } from 'react';

class Voter extends Component {
  render() {
    return (
      <div>
        Vote for Applegate 2020
        <button onClick={() => this.vote(1)}>vote</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('vote');
  }
  vote(increment) {
    const { methods } = this.props.drizzle.contracts.Election;
    methods.incrementVote(increment);
  }
}

export default Voter;
