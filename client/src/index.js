import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Drizzle, generateStore } from "drizzle";

// Hiya Ros

import Vote from "./contracts/Vote.json";
const options = {
  contracts: [Vote]
  //events: { Vote: ["VoteTracker"] }
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));
