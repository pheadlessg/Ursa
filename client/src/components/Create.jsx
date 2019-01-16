import React, { Component } from 'react';
import {Content, Button} from '../GlobalStyle'

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
    loading: false,
    drizzleState: null
  };

  render() {
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
          <Button>SUBMIT YOUR ELECTION & CHANGE THE FUTURE</Button>
        </form>
         <h5>Candidates:</h5>
        <ul>
          {this.state.election.candidates.map(candi => (<li>{candi}</li>))}
        </ul>
        <h5>Voters:</h5>
        <ul>
          {this.state.election.whiteList.map(voter => (<li>{voter}</li>))}
        </ul>
        <Button onClick={() => this.logNewElection()}></Button>
      </div>
    );
  }
  
  componentDidMount() {
    console.log(this.props);
    const { router, params, location, routes } = this.props;
    console.log(params, router, location, routes);
  }



  handleChange = event => {  
    const { value, name } = event.target;
    this.setState(prevState => ({ election: {...prevState.election, [name] : value} }))
    console.log(this.state)
  }

  // prevent default on enter press and add to array in state
    handleKeyPress = event => {
    if (event.key == 'Enter') {
      event.preventDefault()
      if(event.target.name == 'newCandidate') {
        this.addCandidate(this.state.election.newCandidate)
        event.target.value = '';
      }
      if(event.target.name == 'newVoter') {
        this.addVoter(this.state.election.newVoter)
        event.target.value = '';
      }
      console.log(this.state.election)
      }
    }

  addCandidate = candidateName => {
    this.setState(prevState => ({ election: {...prevState.election, candidates: [...prevState.election.candidates, candidateName]}}));
  };

  addVoter = voter => {
    this.setState(prevState => ({ election: {...prevState.election, whiteList: [...prevState.election.whiteList, voter]}}));
  };

  logNewElection = async () => {
    // console.log(this.props.parentState.drizzle)
    const { methods } = this.props.parentState.drizzle.contracts.Vote;
    const response = await methods
      .startElection(
        'Test',
        9999,
        ['0x63616e646964617465206f6e65'],
        [
          '0x994DD176fA212730D290465e659a7c7D0549e384',
          '0xe7BA88433E60C53c69b19f503e00851B98891551'
        ]
      )
      .send();
    console.log(response);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
}

export default Create;