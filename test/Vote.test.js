const Vote = artifacts.require("./Vote.sol");

contract("Vote", accounts => {
  let instance;
  let electionCandidates;

  before(async () => {
    instance = await Vote.deployed();
    await instance.startElection(
      "Test Election",
      100,
      ["0x63616e646964617465206f6e65", "0x63616e6469646174652074776f"],
      [accounts[1], accounts[2], accounts[3]]
    );
    electionCandidates = await instance.getElectionCandidates(1);
  });
  describe("startElection", () => {
    it("contract successfully compiles", async () => {
      const smokeTest = await instance.smokeTest();
      expect(smokeTest).to.eql("smokeTest");
    });
    it("intitlizes an election with the correct values", async () => {
      const testElection = await instance.elections(1);
      expect(typeof testElection).to.eql("object");
      expect(testElection).to.have.all.keys([
        "0",
        "1",
        "2",
        "3",
        "creator",
        "electionName",
        "expirationTime",
        "candidatesCount"
      ]);

      const time = await instance.setTimer(100);

      expect(testElection.creator).to.equal(accounts[0]);
      expect(testElection.electionName).to.equal("Test Election");
      expect(testElection.expirationTime.toNumber()).to.equal(time.toNumber());
      expect(testElection.candidatesCount.toNumber()).to.equal(3);
    });
    describe("getElectionCandidates", () => {
      it("returns an array containing the candidates id for a particular election", async () => {
        expect(electionCandidates[0].toNumber()).to.equal(1);
        expect(electionCandidates[1].toNumber()).to.equal(2);
      });
    });
  });
});