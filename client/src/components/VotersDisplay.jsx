import React, { Component } from "react";

class VotersDisplay extends Component {
  state = {
    voterNumber: 0,
    voters: []
  };
  render() {
    return (
      <div>
        <p>Here are the {this.state.voterNumber} voters:</p>
      </div>
    );
  }
  componentDidMount() {
    const { methods } = this.props.drizzle.contracts.Election;
    console.log(methods);
    methods
      .voterCount()
      .call()
      .then(voterNumber => {
        this.setState({ voterNumber }, () => {
          const promiseArray = [];
          for (let i = 1; i <= voterNumber; i++) {
            promiseArray.push(methods.voters(i).call());
          }
          // console.log(promiseArray);
          Promise.all([promiseArray]).then(console.log);
        });
      });
  }
}

export default VotersDisplay;
