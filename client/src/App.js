import React, { Component } from 'react';
import ReadString from './ReadString';
import SetString from './SetString';

class App extends Component {
  state = { loading: true, drizzleState: null };

  render() {
    if (this.state.loading) return 'Loading Drizzle...';
    return (
      <div className="App">
        <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
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
