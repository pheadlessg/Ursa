pragma solidity ^0.5.0;

contract Vote {

    string public testString = "Im here for testing, leave me be!";
    // please do not remove testString
    uint public electionCount;
    mapping(uint => Election) public elections;

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        address[] voters;
        uint expirationTime;
        uint candidatesCount;
        mapping(address => Voter) votersInfo;
        mapping(uint => Candidate) candidates;
    }

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

    event VoteTracker(uint id, uint voteCount);

    function startElection(address _creator, string memory _electionName, uint _expirationTime) public {
        electionCount++;
        address[] memory voters;
        elections[electionCount] = Election(_creator, _electionName, 0, voters, _expirationTime, 0);
    }

    function addElectionCandidate(uint _electionId, string memory _candidateName) public {
        elections[_electionId].candidatesCount++;
        uint i = elections[_electionId].candidatesCount;
        Candidate memory newCand;
        newCand.id = i;
        newCand.name = _candidateName;
        elections[_electionId].candidates[i] = newCand;
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