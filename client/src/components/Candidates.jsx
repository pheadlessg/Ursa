import React, { Component } from 'react';
import Voter from './Voter';

class Candidates extends Component {
  state = {
    candidates: [],
    '1': null,
    '2': null,
    isLoading: true
  };
  render() {
    const { isLoading, candidates } = this.state;
    return (
      <div>
        {!isLoading ? (
          <>
            {candidates.map((candidate, i) => (
              <div key={i}>
                <p>{candidate.name}</p>
              </div>
            ))}
            <p>{`votes for A: ${this.state[1]}`}</p>
            <p>{`votes for B: ${this.state[2]}`}</p>
            <Voter drizzle={this.props.drizzle} vote={this.vote} />
          </>
        ) : (
          'loading...'
        )}
      </div>
    );
  }
  componentDidMount() {
    const { Election } = this.props.drizzle.contracts;
    Election.methods
      .candidates(1)
      .call()
      .then(candidate => {
        const copy = [...this.state.candidates];
        copy[candidate.id - 1] = candidate;
        this.setState({
          candidates: copy,
          [candidate.id]: candidate.voteCount
        });
      })
      .then(() => {
        Election.methods
          .candidates(2)
          .call()
          .then(candidate => {
            const copy = [...this.state.candidates];
            copy[candidate.id - 1] = candidate;
            this.setState({
              isLoading: false,
              candidates: copy,
              [candidate.id]: candidate.voteCount
            });
          });
      });
  }
  vote = async (cand, increment) => {
    const { methods } = this.props.drizzle.contracts.Election;
    const votes = await methods['incrementVote'].cacheSend(cand, increment);
    const old = this.state[cand];
    const total = votes + Number(old);
    this.setState({ [cand]: total });
  };
}

export default Candidates;
