pragma solidity ^0.5.0;

contract Vote {

    string public testString = "Im here for testing, leave me be!";
    // please do not remove testString

    struct Election {
        address creator;
        string electionName;
        uint voteCount;
        uint expirationTime;
        uint candidatesCount;
        // bytes32[] candidates;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;
    Candidate[] public candidatesStorage;


    function startElection(address _creator, string memory _electionName, uint _expirationTime, bytes32[] memory newCandidates) public {
        electionCount++;
        for (uint i = 0; i < newCandidates.length; i++) {
            candidatesStorage.push(Candidate({
                id: i,
                name: newCandidates[i],
                voteCount: 0
            }));
        }
        elections[electionCount] = Election(_creator, _electionName, 0, _expirationTime, 0);
    }

    struct Candidate  {
        uint id;
        bytes32 name;
        uint voteCount;
    }

    struct Voter {
        address name;
        bool hasVoted;
    }

    uint public voterCount;
    uint public candidatesCount;


    constructor () public {
    }
}

// bytes32
//  [
//     '0x63616e646964617465206f6e65',
//     '0x63616e6469646174652074776f'
//   ]