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
          for (let i = 1; i <= voterNumber; i++) {
            methods
              .voters(i)
              .call()
              .then(voter => {
                console.log(voter);
              });
          }
        });
      }); // methods
    //   .voters(1)
    //   .call()
    //   .then(console.log);
  }
}

export default VotersDisplay;
