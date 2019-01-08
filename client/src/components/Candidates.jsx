import React, { Component } from 'react';

class Candidates extends Component {
  state = {
    candidates: null,
    isLoaded: false
  };
  render() {
    return (
      <div>
        {this.state.isLoaded
          ? `${this.state.candidates.name}, votes: ${
              this.state.candidates.voteCount
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
      .then(candidates => {
        console.log(candidates);
        this.setState({ isLoaded: true, candidates });
      });
  }
}

export default Candidates;
