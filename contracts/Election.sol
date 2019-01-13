pragma solidity ^0.5.0;

import "./VoteToken.sol";
import "./Candidates.sol";

contract Election is Candidates {
    struct Ballot {
        address owner;
        string name;
        uint expirationTime;
        uint candidatesCount;
    }
    uint public ballotNumber;
    mapping(uint => Ballot) ballotStructs;

    function createElection(string memory name, uint expirationTime) public returns (bool success){
        clearAllCandidates();
        ballotNumber++;
        ballotStructs[ballotNumber].owner = msg.sender;
        ballotStructs[ballotNumber].name = name;
        ballotStructs[ballotNumber].expirationTime = expirationTime;
        ballotStructs[ballotNumber].candidatesCount = getCandidateCount();
        return true;
    }

    function getElection(uint number) public view returns (address owner, string memory name, uint expirationTime, uint candidatesCount) {
        return (ballotStructs[number].owner, 
        ballotStructs[number].name, 
        ballotStructs[number].expirationTime, 
        ballotStructs[number].candidatesCount);
    }
}