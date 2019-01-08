import React, { Component } from 'react';

class Candidates extends Component {
  state = {
    candidates: [],
    isLoaded: false
  };
  render() {
    return (
      <div>
        {this.state.isLoaded
          ? `${this.state.candidates[1].name}, votes: ${
              this.state.candidates[1].voteCount
            }`
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
        copy[candidate.id] = candidate;
        this.setState({ isLoaded: true, candidates: copy });
      })
      .then(() => {
        Election.methods
          .candidates(2)
          .call()
          .then(candidate => {
            const copy = [...this.state.candidates];
            copy[candidate.id] = candidate;
            this.setState({ isLoaded: true, candidates: copy });
          });
      });
  }
}

export default Candidates;
