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
    // console.log(web3);
    // web3.subscribe('VoteTracker', {},(err, data) => {
    //   console.log(data);
    // });
    // Election.methods
    //   .candidatesCount()
    //   .call()
    //   .then(candCount => this.setState({ candCount, isLoading: false }));
  }
}

export default VoteTracker;
