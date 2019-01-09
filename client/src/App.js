import React, { Component } from 'react';
import Candidates from './components/Candidates';
<<<<<<< HEAD
import Voter from './components/Voter';
import AddCandidate from './components/AddCandidate';
=======
>>>>>>> 3cc937132b961e6ac9557f39bd588ae2ed4e1fc0

class App extends Component {
  state = { loading: true, drizzleState: null };

  render() {
    if (this.state.loading) return 'Loading Drizzle...';
    return (
      <div className="App">
        <h1>page</h1>
        <Candidates drizzle={this.props.drizzle} />
<<<<<<< HEAD
        <Voter drizzle={this.props.drizzle} />
        <AddCandidate
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
=======
>>>>>>> 3cc937132b961e6ac9557f39bd588ae2ed4e1fc0
      </div>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default App;
