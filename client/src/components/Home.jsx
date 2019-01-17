import React, { Component } from "react";
import styled from "styled-components";
import { Content, Button } from "../GlobalStyle";
import { Link } from "react-router-dom";

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
    return (
      <HomeScreen>
        <h2>welcome to ursa</h2>
        <h3>a blockchain voting application</h3>
        <StyledLink to="/create">
          <Button primary>Create New Election</Button>
        </StyledLink>

        <StyledLink to="/links">
          <Button primary>Choose an Election</Button>
        </StyledLink>
      </HomeScreen>
    );
  }
}

export default Home;
