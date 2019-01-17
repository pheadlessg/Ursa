import React, { Component } from "react";
import styled from "styled-components";
import { Content, Button, StyledLink} from "../GlobalStyle";

const HomeScreen = styled.div`
  margin: auto;
  margin-top: 4vh;
`;



class Home extends Component {
  render() {
    return (
      <HomeScreen>
        <h2>welcome to ursa</h2>
        <h3>a blockchain voting application</h3>
        <StyledLink main to="/create">
          <Button primary>Create New Election</Button>
        </StyledLink>

        <StyledLink main to="/links">
          <Button primary>Choose an Election</Button>
        </StyledLink>
      </HomeScreen>
    );
  }
}

export default Home;
