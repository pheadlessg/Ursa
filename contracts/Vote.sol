pragma solidity ^0.5.0;

import "./VoteToken.sol";

contract Vote {

    string public testString = "Im here for testing, leave me be!";
    // please do not remove testString

    struct Election {
        address creator;
        string electionName;
        uint expirationTime;
        uint candidatesCount;
        Candidate[] candidates;
    }

    uint public electionCount;
    Election[] public elections;

    function startElection(address _creator, string memory _electionName, uint _voteLength) public {
        electionCount++;
        Election memory newElection;
        newElection.creator = _creator;
        newElection.electionName = _electionName;
        newElection.expirationTime = setTimer(_voteLength);
        newElection.candidatesCount = 5;
        elections.push(newElection);
        electionCount++;
    }

    // Candidate[] public candidates;
    // uint public candidateCount;

    // function addCandidate(string name) public {
    //     Candidate memory newCandidate;

    // }

    struct Candidate  {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        address name;
        bool hasVoted;
    }

    uint public voterCount;
    uint public candidatesCount;

    function addElectionCandidate(uint _electionId, string memory _candidateName) public {
        Election storage e = elections[_electionId];
        e.candidates[e.candidatesCount++] = Candidate(e.candidatesCount, _candidateName, 0);
    }


    function showElectionCandidates(uint _electionId) public returns (string memory name){
        return elections[_electionId].candidates[1].name;
    }

    function setTimer(uint _voteLength) public returns (uint) {
        uint StartTime = block.timestamp;
        return StartTime + _voteLength;
    }

    constructor () public {
    }
}