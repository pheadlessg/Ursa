const Election = artifacts.require('./Election.sol');

contract('Election', async () => {
  it('can create new ballots', async () => {
    const instance = await Election.deployed();
    await instance
      .createElection('test', 1000)
      .then(data => assert.equal(data.receipt.status, true));
  });
  it('returns election details', async () => {
    const instance = await Election.deployed();
    await instance.createElection('test', 1000);
    await instance.getElection(1).then(data => {
      assert.equal(data.name, 'test');
    });
  });
});
