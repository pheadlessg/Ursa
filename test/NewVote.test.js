const NewVote = artifacts.require('./NewVote.sol');

contract('NewVote', async () => {
  it('can add candidates', async () => {
    const instance = await NewVote.deployed();
    await instance.addCandidate('test');
    await instance.getCandidate(1).then(data => {
      assert.equal(data.name, 'test');
    });
  });
});
