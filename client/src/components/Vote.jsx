import React, { Component } from "react";
import { Content } from "../GlobalStyle";
import styled from "styled-components";
import { PieChart } from "react-easy-chart";
const moment = require("moment");

const Table = styled.table`
  width: 100%;
  border: 1px solid black;
`;

const Voter = styled.div`
  width: 100%;
`;

const VoteButton = styled.button`
  border: 1px solid black;
  width: 30px;
  height: 30px;
  padding: 0px;
`;

const ResultChart = styled(PieChart)`
  height: 50px;
`;
const TableColumn = styled.tc;

class Vote extends Component {
  state = {
    electionId: null,
    electionName: null,
    loading: false,
    drizzleState: null,
    candidatesData: [],
    currentTime: null,
    unixEnd: null,
    isWhiteListed: false,
    isLoaded: false
  };

  render() {
    const {
      candidatesData,
      electionName,
      unixEnd,
      currentTime,
      isWhiteListed
    } = this.state;
    let countDown = moment.unix(unixEnd - currentTime - 3600).format("H:mm:ss");
    return (
      <Voter>
        <h2>{`Poll: ${electionName}`}</h2>
        <h3>{`polls close: ${moment.unix(unixEnd).calendar()}`}</h3>
        <h3>
          vote{" "}
          {currentTime > unixEnd
            ? "now closed"
            : `open: ${countDown} remaining`}
        </h3>
        {true ? (
          <div>
            <Table>
              <tr>
                <th>#id</th>
                <th>Candidate</th>
                <th>Count</th>
              </tr>
              <tbody>
                {candidatesData.map(candidate => (
                  <tr key={candidate["0"]}>
                    <th>
                      <div>{candidate["0"]}</div>
                    </th>
                    <th>
                      <div>{this.hexTranslate(candidate["1"])}</div>
                    </th>
                    <th>
                      <div>{candidate["2"]}</div>
                    </th>
                    {isWhiteListed && currentTime < unixEnd ? (
                      <VoteButton
                        onClick={() => this.voteForCandidate(candidate["0"])}
                      >
                        vote
                      </VoteButton>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
            {isWhiteListed ? null : "you are not registered to vote"}
          </div>
        ) : (
          "empty"
        )}
        <ResultChart data={this.formatCandidateData(candidatesData)} />
      </Voter>
    );
  }

  componentDidMount() {
    console.log("mounted");
    this.setState({ electionId: this.props.match.params.id }, () => {
      this.isWhiteListed();
      this.clock();
      this.getElectionData().then(data => {
        let { expirationTime, electionName } = data;
        let unixEnd = expirationTime;
        this.setState({ electionName, unixEnd });
        this.retrieveCandidates();
      });
    });
  }

  formatCandidateData = data => {
    return data.reduce((acc, cand) => {
      const result = {
        key: cand["0"],
        value: cand["2"]
      };
      acc.push(result);
      return acc;
    }, []);
  };

  clock = () => {
    setInterval(() => {
      let currentTime = moment(Date.now() / 1000);
      this.setState({ currentTime });
    }, 1000);
  };

  isWhiteListed = async () => {
    const user = this.props.parentState.drizzle.web3.eth.accounts.givenProvider
      .selectedAddress;
    const { electionId } = this.state;
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const whiteList = await methods.getWhiteList(electionId).call();
    whiteList.forEach(account => {
      if (account.toLowerCase() === user.toLowerCase())
        this.setState({ isWhiteListed: true });
    });
  };

  logString = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    console.log(await methods.smokeTest().call());
  };

  voteForCandidate = async candId => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const { electionId } = this.state;
    const response = await methods.voteForCandidate(candId, electionId).send();
    await this.retrieveCandidates();
  };

  getElectionData = async () => {
    const { electionId } = this.state;
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const data = await methods.elections(electionId).call();
    return data;
  };

  retrieveCandidates = async () => {
    const { electionId } = this.state;
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const candidates = await methods.getElectionCandidates(electionId).call();
    const promiseArray = [];
    for (let i = 0; i < candidates.length; i++) {
      let candidateData = methods.getCandidate(candidates[i]).call();
      promiseArray.push(candidateData);
    }
    const candidatesData = await Promise.all(promiseArray);
    this.setState({ candidatesData, isLoaded: true }, () => {
      this.formatCandidateData(this.state.candidatesData);
    });
  };

  stringTranslate = str => {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let hex = Number(str.charCodeAt(i)).toString(16);
      out.push(hex);
    }
    return out.join("");
  };
  hexTranslate(str) {
    let hex = str.toString();
    let out = "";
    for (let i = 0; i < hex.length; i += 2) {
      if (hex[i] !== "0") {
        out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
    }
    return out;
  }
}

export default Vote;
