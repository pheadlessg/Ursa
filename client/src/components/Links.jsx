import React, { Component } from 'react';
import ElectionCard from './ElectionCard';
import {Container} from '../GlobalStyle'

class Links extends Component {
  state = {
    electionCount: 0,
    electionArr: []
  };
  render() {
    return (
      <Container >
        {this.state.electionArr.map((data, index) => {
          return <ElectionCard electiondata={data} electionid={index} />;
        })}
      </Container>
    );
  }
  componentDidMount() {
    this.getElectionCount();
  }
  getElectionCount = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    await methods
      .electionCount()
      .call()
      .then(data => {
        this.setState({ electionCount: data }, () => {
          this.createElectionArray();
        });
      });
  };

  createElectionArray = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const promiseArr = [];
    for (let i = 1; i <= this.state.electionCount; i++) {
      const electionData = methods.elections(i).call();
      promiseArr.push(electionData);
    }
    const electionsData = await Promise.all(promiseArr);
    this.setState({ electionArr: electionsData });
  };
}

export default Links;
