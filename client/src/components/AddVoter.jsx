import React, { Component } from 'react';

class AddVoter extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={() => {
          this.addVoter();
        }}
      >
        Add Voter
      </button>
    );
  }
  addVoter = () => {
    const { methods } = this.props.drizzle.contracts.Election;
    // console.log(methods);
    methods.addVoter.cacheSend('0x994dd176fa212730d290465e659a7c7d0549e384');
  };
}

export default AddVoter;
