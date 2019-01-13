import React, { Component } from 'react';

class AddVoter extends Component {
  state = {
    voterAddress: ''
  };
  render() {
    return (
      <form >
        <input type="text" onChange={this.handleChange}/>
      <button
        onClick={(e) => {
          this.handleSubmit(e)
        }}
      >
        Add Voter
      </button>
      </form>
    );
  }
  addVoter = (voterAddress) => {
    const { methods } = this.props.drizzle.contracts.Election;
    // console.log(voterAddress);
    // methods.addVoter.cacheSend('0x994dd176fa212730d290465e659a7c7d0549e384');
    methods.addVoter.cacheSend(voterAddress);
  };
  handleChange = (e) => {
    this.setState({voterAddress: e.target.value})
    // console.log(this.state.voterAddress)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.addVoter(this.state.voterAddress);
    this.setState({voterAddress: ''})
  }
}

export default AddVoter;
