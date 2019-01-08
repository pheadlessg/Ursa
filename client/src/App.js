import React, { Component } from 'react';

class App extends Component {
  state = { loading: true, drizzleState: null };

  render() {
    return (
      <>
        <h1>
          {this.state.loading
            ? 'Loading Drizzle...'
            : 'Drizzle loaded - check the console'}
        </h1>
      </>
    );
  }

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        console.log(drizzleState);
        this.setState({ loading: false, drizzleState });
        console.log(this.state);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default App;
