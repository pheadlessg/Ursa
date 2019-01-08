import React, { Component } from 'react';

class Candidates extends Component {
  state = {
    candidates: [],
    isLoaded: false
  };
  render() {
    const { isLoaded, candidates } = this.state;
    return (
      <div>
        {isLoaded
          ? candidates.map(candidate => (
              <>
                <p>{candidate.name}</p>
                <br />
                <p>{candidate.voteCount}</p>
              </>
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
            this.setState({ isLoaded: true, candidates: copy });
            console.log(this.state.candidates);
          });
      });
  }
}

export default Candidates;
