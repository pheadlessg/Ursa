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
      5,
      ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f']
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
    // the function changes address letters to upper case!
    expect(election.creator).to.eql(
      '0x994DD176fA212730D290465e659a7c7D0549e384'
    );
    expect(election.electionName).to.eql('Test Election');
    const candidates1 = await instance.candidatesStorage(0);
    const candidates2 = await instance.candidatesStorage(1);
    expect(candidates1.name).to.eql(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    expect(candidates2.name).to.eql(
      '0x63616e6469646174652074776f00000000000000000000000000000000000000'
    );
  });
});
