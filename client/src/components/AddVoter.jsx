import React, { Component } from "react";

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
    methods.addVoter.cacheSend("example");
  };
}

export default AddVoter;
