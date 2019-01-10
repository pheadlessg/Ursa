pragma solidity ^0.5.0;

contract owned {
    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract Election is owned {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;

    //mapping(address => bool) public voters;

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
    }

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addOwnerCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    // function vote (uint _id) public {
    //     require(!voters[msg.sender]);
    //     voters[msg.sender] = true;
    //     candidates[_id].voteCount++;
    //     emit VoteTracker(_id, candidates[_id].voteCount);
    // }


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
