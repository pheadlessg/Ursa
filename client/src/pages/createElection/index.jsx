import React, { Component } from 'react';
import { Button } from '../../GlobalStyle';

class CreateElection extends Component {
  state = {
    election_id: null,
    election_name: null,
    expiration_time: null,
    candidates: null,
    hexCandidates: [],
    whitelist: []
  };
  render() {
    return (
      <div>
        <h2>Create new Election</h2>
        <form>
          {/* <label htmlFor="election-name">Election Name</label>
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
          <br /> */}
          <label>Add Candidate</label>
          <input
            type="text"
            id="candidates"
            value={this.state.value}
            onSubmit={this.handleCandidateSubmit}
          />
          {/* <br />
          <label htmlFor="whitelist">Voter</label>
          <input
            name="whitelist"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          /> */}
          <Button>SUBMIT YOUR ELECTION & CHANGE THE FUTURE</Button>
        </form>
        ;
      </div>
    );
  }
  handleCandidateSubmit = event => {
    console.log(event);
    const { value } = event.target;
    this.setState({ candidates: value });
  };
}

function hexTranslate(str) {
  const array = [];
  for (let i = 0; i < str.length; i++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    array.push(hex);
  }
  return array.join('');
}

export default CreateElection;
