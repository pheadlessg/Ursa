pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Vote is ERC20 {

    string public testString = "Im here for testing";

    struct Election {
        address creator;
        string electionName;
        uint tokenCount;
        uint expirationTime;
        uint candidatesCount;
        bytes32[] candidateData;
        address[] whiteList;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;
    mapping(bytes32 => Candidate) candidateStorage;
    bytes32[] candidateNames;

    function startElection(string memory _electionName, uint _expirationTime, uint _tokenCount, bytes32[] memory newCandidates, address[] memory _whiteList) public {
        electionCount++;
        uint _voteLength = setTimer(_expirationTime);
        mint(_tokenCount);
        elections[electionCount] = Election(msg.sender, _electionName, 0, _voteLength, newCandidates.length, new bytes32[](0), new address[](0));
        for (uint i = 0; i < newCandidates.length; i++) {
            candidateNames.push(newCandidates[i]);
            candidateStorage[newCandidates[i]] = Candidate(
                i,
                newCandidates[i],
                0
            );
            elections[electionCount].candidateData.push(newCandidates[i]);
        }
        for (uint j = 0; j < _whiteList.length ; j++){
            elections[electionCount].whiteList.push(_whiteList[j]);
        }
    }

    function getElectionCandidates(uint i) public view returns (bytes32[] memory){
        return elections[i].candidateData;
    }

    function getWhiteList(uint i) public view returns (address[] memory){
        return elections[i].whiteList;
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

    function setTimer(uint _voteLength) public view returns (uint) {
        uint StartTime = block.timestamp;
        return StartTime + _voteLength;
    }

    constructor () public {
    }
    
    function mint(uint _tokens) public {
        _mint(msg.sender, _tokens);
    }
}

