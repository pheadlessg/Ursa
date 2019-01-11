pragma solidity ^0.5.0;

contract NewVote{
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) candidateStructs;

    Candidate[] candidateArray;

    uint public candidateCount;

    function addCandidate(string memory name) public returns (bool success) {
        candidateCount++;
        candidateStructs[candidateCount].name = name;
        candidateStructs[candidateCount].voteCount = 0;
        candidateArray.push(candidateStructs[candidateCount]);
        return true;
    }

    function getCandidate(uint candidateId) public view returns (string memory name, uint voteCount) {
        return (candidateStructs[candidateId].name, candidateStructs[candidateId].voteCount);
    }
}