const Vote = artifacts.require('./Vote.sol');

contract('Vote', accounts => {
  it('smoke test', async () => {
    const instance = await Vote.deployed();
    const test = await instance.testString();
    expect(test).to.eql('Im here for testing');
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
    // note: when passing an address into solidity the compiler some changes address letters to upper case. Looks like tests are failing sometimes even when the function is running as normal.
    expect(election.creator).to.eql(
      '0x994DD176fA212730D290465e659a7c7D0549e384'
    );
    expect(election.electionName).to.eql('Test Election');
  });
  it('vote for candidate function increases candidate vote count by one', async () => {
    const instance = await Vote.deployed();
    const candBeforeVote = await instance.getCandidate(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    expect(candBeforeVote[2].toNumber()).to.eql(0);
    await instance.voteForCandidate(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    const candAfterVote = await instance.getCandidate(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    expect(candAfterVote[2].toNumber()).to.eql(1);
  });
  it('getElectionCandidates function returns array of candidates originally passed into startElection constructor', async () => {
    const instance = await Vote.deployed();
    await instance.startElection(
      '0x994dd176fa212730d290465e659a7c7d0549e384',
      'Test Election',
      5,
      ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f']
    );
    const candidates = await instance.getElectionCandidates(1);
    expect(candidates).to.eql([
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000',
      '0x63616e6469646174652074776f00000000000000000000000000000000000000'
    ]);
  });
  it('getCandidate function returns single candidate with name (currently in hexadecimal, annoyingly), with id and vote count', async () => {
    const instance = await Vote.deployed();
    await instance.startElection(
      '0x994dd176fa212730d290465e659a7c7d0549e384',
      'Test Election',
      5,
      ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f']
    );
    const cand = await instance.getCandidate(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    expect(cand[1]).to.eql(
      '0x63616e646964617465206f6e6500000000000000000000000000000000000000'
    );
    expect(cand[2].toNumber()).to.eql(0);
  });
  it('set timer converts user input to unix timestamp', async () => {
    const instance = await Vote.deployed();
    await instance.startElection(
      '0x994dd176fa212730d290465e659a7c7d0549e384',
      'Test Election',
      5,
      ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f']
    );
    const election = await instance.elections(1);
    expect(typeof election.expirationTime.toNumber() === 'number');
  });
});
