pragma solidity ^0.5.0;

import "./VoteToken.sol";

contract Candidates is VoteToken {

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) candidateStructs;

    Candidate[] candidateArray;
    uint public electionCount;
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

    function getCandidateCount() public view returns (uint count) {
        return candidateCount;
    }
    
    function voteCandidate(uint candidateId) public returns (bool success) {
        candidateStructs[candidateId].voteCount++;
        return true;
    }

    function getAllCandidates() public view returns (string memory name, uint voteCount) {
        for (uint i = 0; i < candidateCount; i++) {
            return (candidateArray[i].name, candidateArray[i].voteCount);
        }
    }

    function clearAllCandidates() public returns (bool success) {
        for (uint i = 1; i < candidateCount; i++) {
            delete candidateStructs[i];
        }
        candidateCount = 0;
        return true;
    }

    function addVoter(address name) public {
        transfer(name, 1);
    } 

    function checkVoter(address name) public view returns (bool) {
        balanceOf(name);
    }
}