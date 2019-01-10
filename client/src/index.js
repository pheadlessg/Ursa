import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Drizzle, generateStore } from 'drizzle';

import Election from './contracts/Election.json';
const options = {
  contracts: [Election],
  events: { Election: ['VoteTracker'] }
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
