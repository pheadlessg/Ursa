import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header, HeaderContainer, Content, LoadingScreen, Img } from './GlobalStyle';
import MainContainer from './grid';
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Vote from './components/Vote';
import Links from './components/Links';

class App extends Component {
  state = { loading: true, drizzleState: null };

  render() {
    if (this.state.loading) return <LoadingScreen main><Img></Img></LoadingScreen>
    return (
      <div className="App">
      <Router>
        <MainContainer>
          <HeaderContainer>
            <Link to='/'><Header main /></Link>
          </HeaderContainer>
          
            <Content>
              <Route
                exact
                path="/"
                render={({ match }) => (
                  <Home match={match} parentState={this.props} />
                )}
              />

              <Route
                exact
                path="/create"
                render={() => <Create parentState={this.props} />}
              />
              <Route
                path="/vote/:id"
                render={({ match }) => (
                  <Vote
                    match={match}
                    loading={this.state.loading}
                    parentState={this.props}
                  />
                )}
              />
              <Route
                path="/links"
                render={() => (
                  <Links
                    loading={this.state.loading}
                    parentState={this.props}
                  />
                )}
              />
            </Content>
        </MainContainer>
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      // Subscribe to changes of state in the drizzle store
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState }, () => {
          // Initialise a datakey to lock in changes to the function
          // const dataKey = drizzle.contracts.Vote.methods.testString.cacheCall();
          // const string = drizzleState.contracts.Vote.testString[dataKey];
          // console.log(drizzleState.contracts.Vote.testString[dataKey])
          // contracts.Vote.methods
          //   .testString()
          //   .call()
          //   .then(testString => {
          //     this.setState({ testString });
          //   });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default App;
