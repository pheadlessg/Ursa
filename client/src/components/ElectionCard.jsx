import React, { Component } from "react";
import { Link } from "react-router-dom";
import { wideButton } from "../GlobalStyle";

class ElectionCard extends Component {
  render() {
    return (
      <div>
        <wideButton>
          <Link
            to={{
              pathname: "/vote",
              search: `?id=${this.props.electionid[3]}`
            }}
          >
            Election Name: {this.props.electionid.electionName}
          </Link>
        </wideButton>
      </div>
    );
  }
}

export default ElectionCard;
