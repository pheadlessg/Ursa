import React, { Component } from 'react';

class VoteTracker extends Component {
  state = {
    votes: null
  };
  render() {
    return <div>votes shown here</div>;
  }
  componentDidMount() {
    const { web3 } = this.props.drizzle;
    web3.eth.subscribe('logs', {}, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default VoteTracker;
