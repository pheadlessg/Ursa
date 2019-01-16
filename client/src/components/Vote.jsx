import React, { Component } from 'react';
import { Content, Button } from '../GlobalStyle';

class Vote extends Component {
  state = {
    loading: false,
    drizzleState: null
  };

  render() {
    return (
      <div>
        <h2>Vote on Election</h2>
        <Button onClick={() => this.logString()}>smoke test</Button>
      </div>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props.parentState;
    const { loading } = this.props;
    if (loading) return;
    console.log('loaded');
    console.log(drizzle);
  }
  logString = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(await methods.smokeTest().call());
  };
  callNewElection = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(methods);
  };
}

export default Vote;
