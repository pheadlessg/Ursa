import React, { Component } from 'react';
import { Content, Button } from '../GlobalStyle';
import {Redirect} from 'react-router-dom';

class Create extends Component {
  state = {
    election: {
      electionName: '',
      expirationTime: '',
      newCandidate: '',
      candidates: [],
      newVoter: '',
      whiteList: []
    },
    electionConfirmed: false,
    loading: false,
    drizzleState: null
  };

  render() {
    if (this.state.electionConfirmed) {
      return <Redirect to="/vote" />
    }
    return (
      <div>
        <h2>Create new Election</h2>
        <form>
          <label htmlFor="electionName">Election Name</label>
          <input
            name="electionName"
            type="text"
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="expirationTime">
            How long do you want the election to last for? Please enter time in
            hours
          </label>
          <input
            name="expirationTime"
            type="text"
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="newCandidate">Add Candidate</label>
          <input
            name="newCandidate"
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="newVoter">Voter</label>
          <input
            name="newVoter"
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <Button onClick={this.submitElection}>SUBMIT YOUR ELECTION & CHANGE THE FUTURE</Button>
        </form>
        <h5>Candidates:</h5>
        <ul>
          {this.state.election.candidates.map(candi => (
            <li>{candi}</li>
          ))}
        </ul>
        <h5>Voters:</h5>
        <ul>
          {this.state.election.whiteList.map(voter => (
            <li>{voter}</li>
          ))}
        </ul>
        {/* <Button onClick={() => {
          return <Redirect to="/vote" />
        }} /> */}
      </div>
    );
  }

  componentDidMount() {
    const { router, params, location, routes } = this.props;
    // console.log(params, router, location, routes);
  }

  componentDidUpdate() {
    
  }
  handleChange = event => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      election: { ...prevState.election, [name]: value }
    }));
  };

  // prevent default on enter press and add to array in state
  handleKeyPress = event => {
    if (event.key == 'Enter') {
      event.preventDefault();
      if (event.target.name == 'newCandidate') {
        this.addCandidate(this.state.election.newCandidate);
        event.target.value = '';
      }
      if (event.target.name == 'newVoter') {
        this.addVoter(this.state.election.newVoter);
        event.target.value = '';
      }
    }
  };

  addCandidate = candidateName => {
    const hexCandiBoi = this.stringTranslate(candidateName)
    this.setState(prevState => ({
      election: {
        ...prevState.election,
        // hexCandiBois: [...prevState.election.hexCandiBois, hexCandiBoi],
        candidates: [...prevState.election.candidates, candidateName]
      }
    }));
  };

  addVoter = voter => {
    this.setState(prevState => ({
      election: {
        ...prevState.election,
        whiteList: [...prevState.election.whiteList, voter]
      }
    }));
  };

  submitElection = async (event) => {
    event.preventDefault();

    alert( 
      'relax'
      )
    const {methods} = this.props.parentState.drizzle.contracts.Vote;
    const response = await methods
      .startElection(
        this.state.election.electionName,
        this.state.election.expirationTime,
        this.state.election.candidates.map(candiBoi => this.stringTranslate(candiBoi)),
        this.state.election.whiteList
      )
      .send()
      .then(() => methods.electionCount()
      .call())
      .then((id) => {
          this.setState({electionConfirmed: true}, () => id)
        })

    // if (this.state.electionConfirmed) return <Redirect to={{pathname: '/vote', search: `?id=${response}`}} />;
  }

  //         '0x994DD176fA212730D290465e659a7c7D0549e384',
  //         '0xe7BA88433E60C53c69b19f503e00851B98891551'


  hexTranslate(str) {
    const array = [];
    for (let i = 0; i < str.length; i++) {
      const hex = Number(str.charCodeAt(i)).toString(16);
      array.push(hex);
    }
    return array.join('');
  }

  stringTranslate = str => {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let hex = Number(str.charCodeAt(i)).toString(16);
      out.push(hex);
    }
    return `0x${out.join('')}`;
  };



  logElection = async () => {
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const key = await methods.elections(1).call();
    console.log(key);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
}

export default Create;
