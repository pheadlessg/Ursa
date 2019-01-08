pragma solidity ^0.5.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    constructor () public {
        addCandidate("Anthony Applegate");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function incrementVote(uint _id) public {
        candidates[_id].voteCount++;
    }
}
