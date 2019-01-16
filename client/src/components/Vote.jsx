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
        <Button onClick={() => this.callNewElection()}>
          call new election
        </Button>
        <Button onClick={() => this.retrieveCandidates()}>
          get the candidates
        </Button>
      </div>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props.parentState;
    const { loading } = this.props;
    if (loading) return;
    console.log('loaded');
  }

  logString = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(await methods.smokeTest().call());
  };

  callNewElection = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const response = await methods
      .startElection(
        'Test',
        9999,
        ['0x63616e646964617465206f6e65'],
        [
          '0x994DD176fA212730D290465e659a7c7D0549e384',
          '0xe7BA88433E60C53c69b19f503e00851B98891551'
        ]
      )
      .send();
    console.log(response);
  };

  retrieveCandidates = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(methods);
  };
  hexTranslate = str => {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let hex = Number(str.charCodeAt(i)).toString(16);
      out.push(hex);
    }
    return out.join('');
  };
}

export default Vote;
