const Election = artifacts.require('./Election.sol');

contract('Election', accounts => {
  it('initializes with one candidate', () => {
    return Election.deployed()
      .then(instance => {
        return instance.candidatesCount();
      })
      .then(count => {
        assert.equal(count, 1);
      });
  });
  it('initalizes the candidates with the correct values', () => {
    return Election.deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(candidate => {
        assert.equal(candidate[0], 1, 'contains the correct id');
        assert.equal(
          candidate[1],
          'Anthony Applegate',
          'contains the correct name'
        );
        assert.equal(candidate[2], 0, 'contains the correct voteCount');
      });
  });
  it('vote count increments + 1', async () => {
    const instance = await Election.deployed();
    let candidate = await instance.candidates(1);
    assert.equal(candidate.voteCount, 0);
    await instance.incrementVote(1, 1);
    candidate = await instance.candidates(1);
    assert.equal(candidate.voteCount, 1);
  });
});
