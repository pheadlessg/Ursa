pragma solidity ^0.5.0;

// contract Owned {
//     address public owner;

//     constructor () public {
//         owner = msg.sender;
//     }

//     modifier onlyOwner {
//         require(msg.sender == owner);
//         _;
//     }
// }

contract Vote {

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        address[] voters;
        uint expirationTime;
        address[] candidates;
        mapping(address => Voter) voterInfo;
        mapping(uint => Candidate) candidateInfo;
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
    uint public candidatesCount;

    event VoteTracker(uint id, uint tally);

    function startElection(string memory _electionName) public {

    }

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addOwnerCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function incrementVote(uint _id, uint _inc) public {
        candidates[_id].voteCount = candidates[_id].voteCount + _inc;
        emit VoteTracker(_id, candidates[_id].voteCount);
    }

    function addVoter(address _name) public {
        voterCount++;
        voters[voterCount] = Voter(voterCount, _name, false);
    }

    constructor () public {}

}