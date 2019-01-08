import React, { Component } from 'react';

class Candidates extends Component {
  state = {
    candidates: [],
    isLoading: true
  };
  render() {
    const { isLoading, candidates } = this.state;
    return (
      <div>
        {!isLoading
          ? candidates.map((candidate, i) => (
              <div key={i}>
                <p>{candidate.name}</p>
                <p>{candidate.voteCount}</p>
              </div>
            ))
          : 'loading...'}
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
        this.setState({ candidates: copy });
      })
      .then(() => {
        Election.methods
          .candidates(2)
          .call()
          .then(candidate => {
            const copy = [...this.state.candidates];
            copy[candidate.id - 1] = candidate;
            this.setState({ isLoading: false, candidates: copy });
          });
      });
  }
}

export default Candidates;
