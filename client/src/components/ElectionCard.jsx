import React, { Component } from "react";
import { Link } from "react-router-dom";
import { wideButton } from "../GlobalStyle";

class ElectionCard extends Component {
  render() {
    return (
      <div>
        <wideButton> <Link to={{ pathname: `/vote/${this.props.electionid + 1}` }}>
            Election Name: {this.props.electiondata.electionName}
          </Link>
        </wideButton>
      </div>
    );
  }
}

export default ElectionCard;
