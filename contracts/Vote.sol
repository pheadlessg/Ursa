pragma solidity ^0.5.0;

import "./VoteToken.sol";

contract Vote is VoteToken {

    string public testString = "Im here for testing, leave me be!";
    // please do not remove testString

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        uint expirationTime;
        uint candidatesCount;
        mapping(uint => Candidate) candidates;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;

    function startElection(address _creator, string memory _electionName, uint _expirationTime) public {
        
        electionCount++;
        elections[electionCount] = Election(_creator, _electionName, 0, _expirationTime, 0);
    }

    struct Candidate  {
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidatesCount;

    function addElectionCandidate(uint _electionId, string memory _candidateName) public {
        Election storage e = elections[_electionId];
        e.candidates[e.candidatesCount++] = Candidate(e.candidatesCount, _candidateName, 0);
    }

    function showElectionCandidates(uint _electionId) public returns (string memory name){
        return elections[_electionId].candidates[1].name;
    }

    function addVoter(address name) public {
        transfer(name, 1);
    }
}