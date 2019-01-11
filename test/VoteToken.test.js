const VoteToken = artifacts.require('./VoteToken.sol');

contract('VoteToken', () => {
  it('initializes with 10 tokens', () => {
    return VoteToken.deployed()
      .then(instance => {
        return instance.totalSupply();
      })
      .then(number => {
        assert.equal(number, 10);
      });
  });
  it('transfers a single token and provides proof that token has been transferred', async () => {
    const instance = await VoteToken.deployed();
    await instance.transfer('0xfe07bbab27dbb64a155b5dfaf51f66049931eeac', 1);
    const data = await instance.balanceOf(
      '0xfe07bbab27dbb64a155b5dfaf51f66049931eeac'
    );
    assert.equal(data, 1);
  });
});
