pragma solidity ^0.5.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    struct Voter {
        uint id;
        string name;
        bool hasVoted;
    }
    mapping(uint => Voter) public voters;

    event VoteTracker(uint id, uint tally);

    constructor () public {
        addCandidate("Anthony Applegate");
        addCandidate("Barbara Bananahammock");
        addVoter("Voter 1");
        addVoter("Voter 2");
        addVoter("Voter 3");
        addVoter("Voter 4");
        addVoter("Voter 5");
    }

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function incrementVote(uint _id, uint _inc) public {
        candidates[_id].voteCount = candidates[_id].voteCount + _inc;
        emit VoteTracker(_id, candidates[_id].voteCount);
    }

    uint public voterCount;

    function addVoter(string memory _name) public {
        voterCount++;
        voters[voterCount] = Voter(voterCount, _name, false);
    }

}