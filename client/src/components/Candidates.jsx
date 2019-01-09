import React, { Component } from "react";
import Voter from "./Voter";
import VoteTracker from "./VoteTracker";
import VotersDisplay from "./VotersDisplay";

class Candidates extends Component {
  state = {
    candidates: [],
    "1": null,
    "2": null,
    isLoading: true
  };
  render() {
    const { isLoading, candidates } = this.state;
    return (
      <div>
        {!isLoading ? (
          <>
            {candidates.map((candidate, i) => (
              <div key={i}>
                <p>{candidate.name}</p>
              </div>
            ))}
            <p>{`votes for A: ${this.state[1]}`}</p>
            <p>{`votes for B: ${this.state[2]}`}</p>
            <Voter drizzle={this.props.drizzle} vote={this.vote} />
            <VoteTracker drizzle={this.props.drizzle} />
            <VotersDisplay drizzle={this.props.drizzle} />
          </>
        ) : (
          "loading..."
        )}
      </div>
    );
  }
  componentDidMount() {
    const { Election } = this.props.drizzle.contracts;
    Election.methods
      .candidates(1)
      .call()
      .then(candidate => {
        const copy = [...this.state.candidates];
        copy[candidate.id - 1] = candidate;
        this.setState({
          candidates: copy,
          [candidate.id]: candidate.voteCount
        });
      })
      .then(() => {
        Election.methods
          .candidates(2)
          .call()
          .then(candidate => {
            const copy = [...this.state.candidates];
            copy[candidate.id - 1] = candidate;
            this.setState({
              isLoading: false,
              candidates: copy,
              [candidate.id]: candidate.voteCount
            });
          });
      });
  }

  vote = async (cand, increment) => {
    const { methods } = this.props.drizzle.contracts.Election;
    const votes = await methods.incrementVote.cacheSend(cand, increment);
    const old = Number(this.state[cand]);
    this.setState({ [cand]: old + 1 });
  };
}

export default Candidates;
