const Vote = artifacts.require('./Vote.sol');

contract('Vote', accounts => {
  it('smoke test', async () => {
    return Vote.deployed()
      .then(instance => {
        return instance.testString();
      })
      .then(test => {
        assert.equal(test, 'Im here for testing, leave me be!');
      });
  });
  it('initilizes a new election with the correct values', async () => {
    const instance = await Vote.deployed();
    await instance.startElection(
      '0x994dd176fa212730d290465e659a7c7d0549e384',
      'Test Election',
      5
    );
    const election = await instance.elections(1);
    expect(typeof election).to.eql('object');
    expect(election).to.have.all.keys([
      '0',
      '1',
      '2',
      '3',
      '4',
      'creator',
      'electionName',
      'expirationTime',
      'voteCount',
      'candidatesCount'
    ]);
    // the function changes letters to upper case!
    expect(election.creator).to.eql(
      '0x994DD176fA212730D290465e659a7c7D0549e384'
    );
    expect(election.electionName).to.eql('Test Election');
  });
  it('add a candidate to an election', async () => {
    const instance = await Vote.deployed();
    await instance.addElectionCandidate(1, 'Test Candidate');
    const candidates = await instance.showElectionCandidates(1);
    console.log(
      'this function needs to actually return the candidate names, maybe with events on the contract'
    );
  });
  it('registers a voter by transferring them a token', async () => {
    const instance = await Vote.deployed();
    await instance.addVoter('0xfe07bbaB27DBb64A155b5DFAF51f66049931EEaC');
    const voter = await instance.balanceOf(
      '0xfe07bbaB27DBb64A155b5DFAF51f66049931EEaC'
    );
    assert.equal(voter, 1);
  });
});
