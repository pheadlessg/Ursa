import React, { Component } from 'react';

class Candidates extends Component {
  state = {
    candidates: null
  };
  render() {
    return (
      <div>
        <p />
      </div>
    );
  }
  componentDidMount() {
    const { Election } = this.props.drizzle.contracts;
    const candiBoiz = Election.methods.candidates(1);
    console.log(candiBoiz);
  }
}

export default Candidates;
