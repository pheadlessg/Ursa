import React, { Component } from "react";
import AppRouter from "./AppRouter";
import {Header} from "./GlobalStyle";
import MainContainer from './grid'
import "./App.css";


class App extends Component {
  state = { loading: true, drizzleState: null, testString: '' };

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
      <MainContainer>
        <Header></Header>
        <AppRouter />
        {/* <StartVote />
          <VoteMenu />
          <VotePage /> */}
        <h1>VOTING</h1>
        <p>{this.state.testString}</p>
        {/* <Candidates drizzle={this.props.drizzle} />
        <AddCandidate
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        /> */}
        </MainContainer>
      </div>
    );
  }


  componentDidMount() {
    const { drizzle } = this.props;
    const {contracts} = drizzle
    console.log(drizzle);

    this.unsubscribe = drizzle.store.subscribe(() => {
      // Subscribe to changes of state in the drizzle store
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState}, () => {
          // Initialise a datakey to lock in changes to the function
          // const dataKey = drizzle.contracts.Vote.methods.testString.cacheCall();
          // const string = drizzleState.contracts.Vote.testString[dataKey];
          // console.log(drizzleState.contracts.Vote.testString[dataKey])
          contracts.Vote.methods.testString().call()
          .then(testString => {
            this.setState({testString})
          })
        });
      }   
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default App;
