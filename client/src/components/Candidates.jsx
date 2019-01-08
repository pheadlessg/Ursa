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
    const { Election } = this.props.drizzleState.contracts;
    console.log(Election);
  }
}

export default Candidates;
