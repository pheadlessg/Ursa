import React, { Component } from 'react';

class Voter extends Component {
  state = {
    candCount: null,
    isLoading: true
  };
  render() {
    const { isLoading, candCount } = this.state;
    return (
      <div>
        {!isLoading ? (
          <>
            <p>{`there are ${candCount} candidates to choose from`}</p>
            <button onClick={() => this.vote(1, 1)}>vote</button>
          </>
        ) : (
          'loading...'
        )}
      </div>
    );
  }
  componentDidMount() {
    const { Election } = this.props.drizzle.contracts;
    console.log(Election.methods.candidatesCount());
    Election.methods
      .candidatesCount()
      .call()
      .then(candCount => this.setState({ candCount, isLoading: false }));
  }
  vote(cand, increment) {
    console.log('voting');
    const { methods } = this.props.drizzle.contracts.Election;
    methods.incrementVote(cand, increment);
  }
}

export default Voter;
