import React, { Component } from "react";
import { Link } from "react-router-dom";
import { WideButton, StyledLink } from "../GlobalStyle";

class ElectionCard extends Component {
  render() {
    return (
      <div>
        <WideButton> <StyledLink main to={{ pathname: `/vote/${this.props.electionid + 1}` }}>
            {this.props.electiondata.electionName}
          </StyledLink>
        </WideButton>
      </div>
    );
  }
}

export default ElectionCard;
