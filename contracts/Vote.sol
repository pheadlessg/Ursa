pragma solidity ^0.5.0;

contract Vote {

    string public testString = "Im here for testing";

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        uint expirationTime;
        uint candidatesCount;
        bytes32[] candidateData;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;
    mapping(bytes32 => Candidate) candidateStorage;
    bytes32[] candidateNames;

    function startElection(address _creator, string memory _electionName, uint _expirationTime, bytes32[] memory newCandidates) public {
        electionCount++;
        for (uint i = 0; i < newCandidates.length; i++) {
            candidateNames.push(newCandidates[i]);
            candidateStorage[newCandidates[i]] = Candidate(
                i,
                newCandidates[i],
                0
            );
        }
        elections[electionCount] = Election(_creator, _electionName, 0, _expirationTime, newCandidates.length, new bytes32[](0));
        elections[electionCount].candidateData.push(newCandidates[0]);
    }

    function getElectionCandidates(uint i) public view returns (bytes32[] memory){
        return elections[i].candidateData;
    }

    function getCandidate(bytes32 _name) public view returns (uint, bytes32, uint) {
        return (candidateStorage[_name].id, candidateStorage[_name].name, candidateStorage[_name].voteCount);
    }

    function voteForCandidate(bytes32 _name) public returns (uint, bytes32, uint) {
        candidateStorage[_name].voteCount++;
        return (candidateStorage[_name].id, candidateStorage[_name].name, candidateStorage[_name].voteCount);
    }

    struct Candidate  {
        uint id;
        bytes32 name;
        uint voteCount;
    }


    constructor () public {
    }
}

