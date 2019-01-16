import React, { Component } from "react";
import { Button } from "../../GlobalStyle";
import styled from "styled-components";

class CreateElection extends Component {
  state = {
    election: {
      electionName: "",
      expirationTime: "",
      newCandidates: "",
      whiteList: []
    }
  };

  handleChange(event, target) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert("thanks for submitting your election" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h2>Create new Election</h2>
        <form onSumbit={this.handleSubmit}>
          <label htmlFor="election-name">Election Name</label>
          <input
            name="election-name"
            type="text"
            value={this.state.value}
            onChange={e => this.handleChange}
          />
          <br />
          <label htmlFor="expiration-time">
            How long do you want the election to last for? Please enter time in
            hours
          </label>
          <input
            name="expiration-time"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="new-candidates">Add Candidate</label>
          <input
            name="new-candidates"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="whitelist">Voter</label>
          <input
            name="whitelist"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button>SUBMIT YOUR ELECTION & CHANGE THE FUTURE</Button>
        </form>
      </React.Fragment>
    );
  }
}

// const CreateElection = (
//     <p>Test</p>
// )
export default CreateElection;
