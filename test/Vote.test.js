const Vote = artifacts.require("./Vote.sol");

contract("Vote", accounts => {
  before(async () => {
    const instance = await Vote.deployed();
    await instance.startElection(
      "Test Election",
      60,
      ["0x63616e646964617465206f6e65", "0x63616e6469646174652074776f"],
      [accounts[1], accounts[2], accounts[3]]
    );
  });
});
it("smoke test", async () => {
  console.log(instance);
  const test = await instance.testString();
  expect(test).to.eql("Im here for testing");
});
