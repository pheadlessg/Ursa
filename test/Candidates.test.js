const Candidates = artifacts.require('./Candidates.sol');

contract('Candidates', async () => {
  it('can add candidates', async () => {
    const instance = await Candidates.deployed();
    await instance.addCandidate('test1');
    await instance.getCandidate(1).then(candidate => {
      assert.equal(candidate.name, 'test1');
    });
  });
  it('can allow a vote on a candidate', async () => {
    const instance = await Candidates.deployed();
    await instance.addCandidate('test2');
    await instance.voteCandidate(1);
    await instance.getCandidate(1).then(number => {
      assert.equal(number.voteCount, 1);
    });
  });
  it('returns the total amount of candidates', async () => {
    const instance = await Candidates.deployed();
    await instance.addCandidate('test3');
    await instance.getCandidateCount().then(number => {
      assert.equal(number, 3);
    });
  });
  it('returns all candidates', async () => {
    const instance = await Candidates.deployed();
    await instance.getAllCandidates().then(console.log);
  });
  it('clears all candidates', async () => {
    const instance = await Candidates.deployed();
    await instance.clearAllCandidates();
    await instance.getCandidate(1).then(candidate => {
      assert.equal(candidate.name, false);
    });
    await instance.getCandidateCount().then(number => {
      assert.equal(number, 0);
    });
  });
  it('checks to see if a voter is valid', async () => {
    const instance = await Candidates.deployed();
    await instance
      .checkVoter('0xfe07bbaB27DBb64A155b5DFAF51f66049931EEaC')
      .then(boolean => {
        expect(boolean).to.equal(false);
      });
  });
  it('registers a voter by transferring them a token', async () => {
    const instance = await Candidates.deployed();
    await instance.addVoter('0xfe07bbaB27DBb64A155b5DFAF51f66049931EEaC');
    const voter = await instance.balanceOf(
      '0xfe07bbaB27DBb64A155b5DFAF51f66049931EEaC'
    );
    assert.equal(voter, 1);
  });
});
