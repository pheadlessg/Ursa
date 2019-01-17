import React, { Component } from 'react';
import styled from "styled-components";
import {Content, Button} from '../GlobalStyle'
import {Link} from 'react-router-dom'

const HomeScreen = styled.div`
margin: auto;
margin-top: 4vh;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: #efefef;
`;

class Home extends Component {
  render() {
    console.log(this.props.parentState.drizzle);
    return (
      <HomeScreen>
        <h2>welcome to ursa</h2>
        <br />
        <h3>a blockchain voting application</h3>
        <Button primary><StyledLink to="/create">Create New Election</StyledLink></Button>
        <Button><StyledLink to="/links">Choose an Election</StyledLink></Button>
      </HomeScreen  >);
  }
}

export default Home;
