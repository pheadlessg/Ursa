pragma solidity ^0.5.0;

contract Vote {

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        address[] voters;
        uint expirationTime;
        address[] candidates;
        mapping(address => Voter) votersInfo;
        mapping(uint => Candidate) candidatesInfo;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        address name;
        bool hasVoted;
    }

    uint public voterCount;
    // DO NOT REMOVE THIS CANDIDATESCOUNT
    uint public candidatesCount = 33;
    uint public electionCount;

    mapping(uint => Election) public elections;

    event VoteTracker(uint id, uint voteCount);

    function startElection(address _creator, string memory _electionName, uint _expirationTime) public {
        electionCount++;
        address[] memory voters;
        address[] memory candidates;
        elections[electionCount] = Election(_creator, _electionName, 0, voters, _expirationTime, candidates);
    }

    // function addCandidate(string memory _name) public {
    //     candidatesCount++;
    //     candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    // }

    // function incrementVote(uint _id, uint _inc) public {
    //     candidates[_id].voteCount = candidates[_id].voteCount + _inc;
    //     emit VoteTracker(_id, candidates[_id].voteCount);
    // }

    // function addVoter(address _name) public {
    //     voterCount++;
    //     voters[voterCount] = Voter(voterCount, _name, false);
    // }

    constructor () public {
    }
}