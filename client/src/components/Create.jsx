import React, { Component } from 'react';
import { Content, Button } from '../GlobalStyle';
import styled from "styled-components";
import {Redirect} from 'react-router-dom';

const CreateScreen = styled.div`
margin: auto;
`;

const InputField = styled.div`
margin: 10px;`;

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
    electionId: 0,
    electionConfirmed: false,
    loading: false,
    drizzleState: null
  };

  render() {
    if (this.state.electionConfirmed) {
      return <Redirect to={{pathname: '/vote', search: `?id=${this.state.electionId}`}} />
    }
    return (
      <CreateScreen>
        <h2>Create new Election</h2>
        <form>
          <InputField>
          <label htmlFor="electionName">Election Name</label>
          <br />
          <input
            name="electionName"
            type="text"
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          </InputField>
          
          <InputField>
          <label htmlFor="expirationTime">
            How long do you want the election to last for?
          </label>
          <br />
          <input
            name="expirationTime"
            type="text"
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          </InputField>
          <InputField>
          <label htmlFor="newCandidate">Add Candidate</label>
          <br />
          <input
            name="newCandidate"
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          </InputField>
          <InputField>
          <label htmlFor="newVoter">Add Voter</label>
          <br />
          <input
            name="newVoter"
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          </InputField>
          <Button onClick={this.submitElection}>START ELECTION</Button>
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
      </CreateScreen>
    );
  }

  componentDidMount() {
    const { router, params, location, routes } = this.props;
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
    const {election} = this.state
    if(election.electionName && election.expirationTime && election.candidates.length > 0 && election.whiteList.length > 0) {
    const {methods} = this.props.parentState.drizzle.contracts.Vote;
    const response = await methods
      .startElection(
        election.electionName,
        election.expirationTime,
        election.candidates.map(candiBoi => this.stringTranslate(candiBoi)),
        election.whiteList
      )
      .send()
      .then(() => methods.electionCount()
      .call())
      .then((id) => {
          this.setState({electionConfirmed: true, electionId: id})
        })
      }
      else {
        alert('please fill out all fields')
      }

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
