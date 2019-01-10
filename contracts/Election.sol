pragma solidity ^0.5.0;

contract Owned {
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
    require(msg.sender == owner);require(msg.sender == owner);
    //mapping(address => bool) public voters;

    uint public candidatesCount;

    struct Voter {
        uint id;
        address name;
        bool hasVoted;
    }
    mapping(uint => Voter) public voters;

    event VoteTracker(uint id, uint tally);

    constructor () public {
        addCandidate("Anthony Applegate");
        addCandidate("Barbara Bananahammock");
        addVoter(0xe7BA88433E60C53c69b19f503e00851B98891551);
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
        // require(!voters[msg.sender]);
        candidates[_id].voteCount = candidates[_id].voteCount + _inc;
        emit VoteTracker(_id, candidates[_id].voteCount);
    }


    uint public voterCount;

    function addVoter(address _name) public {
        voterCount++;
        // iterate over all voters and check if the input address 
        // matches any of the existing addresses, if any match, do not allow to vote
        voters[voterCount] = Voter(voterCount, _name, false);
    }
}


contract Vote {

    struct Election is Owned {
        address creator;
        uint voteCount;
        address[] voters;
        uint expirationTime;
        address[] candidates;
        mapping(address => Voter) voterInfo;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        uint id;
        address name;
        bool hasVoted;
    }

}