import React, { Component } from 'react';

class Voter extends Component {
  state = {
    candCount: null,
    isLoading: true
  };
  render() {
    const { isLoading, candCount } = this.state;
    const { vote } = this.props;
    return (
      <div>
        {!isLoading ? (
          <>
            <p>{`there are ${candCount} candidates to choose from`}</p>
            <button onClick={() => vote(1)}>vote for AA</button>
            <button onClick={() => vote(2)}>vote for BB</button>
          </>
        ) : (
          'loading...'
        )}
      </div>
    );
  }
  componentDidMount() {
    const { Election } = this.props.drizzle.contracts;
    Election.methods
      .candidatesCount()
      .call()
      .then(candCount => this.setState({ candCount, isLoading: false }));
  }
}

export default Voter;
