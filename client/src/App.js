import React, { Component } from 'react';
import Candidates from './components/Candidates';

class App extends Component {
  state = { loading: true, drizzleState: null };

  render() {
    if (this.state.loading) return 'Loading Drizzle...';
    return (
      <div className="App">
        <h1>page</h1>
        <Candidates drizzle={this.props.drizzle} />
      </div>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(drizzle);
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
