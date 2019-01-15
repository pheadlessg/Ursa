import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import CreateElection from './pages/createElection'


const Index = () => Home
const List = () => <h2>List of elections</h2>;
const Vote = () => <h2>Vote</h2>;

  const AppRouter = () => (
  <Router>
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createelection/">Create Election</Link>
          </li>
          <li>
            <Link to="/list/">List</Link>
          </li>
          <li>
            <Link to="/vote/">Vote</Link>
          </li>
        </ul>
      </nav> */}
      <Route path="/" exact component={Index} />
      <Route path="/createelection/" component={CreateElection} />
      <Route path="/list/" component={List} />
      <Route path="/vote" component={Vote} />
    </div>
  </Router>
);

export default AppRouter;
