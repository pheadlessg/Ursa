const Vote = artifacts.require("./Vote.sol");

contract("Contract", accounts => {
  let instance;
  before(async () => {
    console.log("in the before hook");
    instance = await Vote.deployed();
    await instance.startElection(
      "Test Election",
      60,
      ["0x63616e646964617465206f6e65", "0x63616e6469646174652074776f"],
      [accounts[1], accounts[2], accounts[3]]
    );
  });
  describe("Vote", () => {
    it("contract successfully compiles", async () => {
      const smokeTest = await instance.smokeTest();
      expect(smokeTest).to.eql("smokeTest");
    });
  });
});
