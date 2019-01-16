import React, { Component } from 'react';
import { Content, Button } from '../GlobalStyle';
const moment = require('moment');

class Vote extends Component {
  state = {
    electionName: null,
    expirationTime: null,
    loading: false,
    drizzleState: null,
    candidatesData: []
  };

  render() {
    const { candidatesData, electionName, expirationTime } = this.state;
    return (
      <div>
        <h2>{`vote on ${electionName}`}</h2>
        <h3>{`end time: ${expirationTime}`}</h3>
        <Button onClick={() => this.logString()}>smoke test</Button>
        <Button onClick={() => this.callNewElection()}>
          call new election
        </Button>
        {candidatesData.length ? (
          <div>
            {candidatesData.map(candidate => (
              <div key={candidate['0']}>
                <div>{`id: ${candidate['0']}`}</div>
                <div>{this.hexTranslate(candidate['1'])}</div>
                <div>{`votes: ${candidate['2']}`}</div>
                <Button onClick={() => this.voteForCandidate(candidate['0'])}>
                  vote
                </Button>
              </div>
            ))}
          </div>
        ) : (
          'empty'
        )}
      </div>
    );
  }

  componentDidMount() {
    const { loading } = this.props;
    if (loading) return;
    console.log('loaded');
    this.getElectionData().then(data => {
      let { expirationTime, electionName } = data;
      expirationTime = moment.unix(expirationTime).calendar();
      this.setState({ expirationTime, electionName });
      this.retrieveCandidates();
    });
  }

  logString = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(await methods.smokeTest().call());
  };

  callNewElection = async () => {
    console.log('uncomment me if you want another election instance');
    // const { methods } = this.props.parentState.drizzle.contracts.Vote;
    // const response = await methods
    //   .startElection(
    //     'Test',
    //     9999,
    //     ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f'],
    //     [
    //       '0x994DD176fA212730D290465e659a7c7D0549e384',
    //       '0xe7BA88433E60C53c69b19f503e00851B98891551'
    //     ]
    //   )
    //   .send();
    // console.log(response);
  };

  voteForCandidate = async candId => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const response = await methods.voteForCandidate(candId, 1).send();
    console.log(response);
    await this.retrieveCandidates();
  };

  getElectionData = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const data = await methods.elections(1).call();
    return data;
  };

  retrieveCandidates = async () => {
    console.log('retrieving');
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const candidates = await methods.getElectionCandidates(1).call();
    const promiseArray = [];
    for (let i = 0; i < candidates.length; i++) {
      let candidateData = methods.getCandidate(candidates[i]).call();
      promiseArray.push(candidateData);
    }
    const candidatesData = await Promise.all(promiseArray);
    console.log(candidatesData);
    this.setState({ candidatesData });
  };

  stringTranslate = str => {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let hex = Number(str.charCodeAt(i)).toString(16);
      out.push(hex);
    }
    return out.join('');
  };
  hexTranslate(str) {
    let hex = str.toString();
    let out = '';
    for (let i = 0; i < hex.length; i += 2) {
      out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return out;
  }
}

export default Vote;
