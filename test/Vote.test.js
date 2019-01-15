const Vote = artifacts.require("./Vote.sol");

contract("Vote", accounts => {
  it("smoke test", async () => {
    console.log(instance);
    const test = await instance.testString();
    expect(test).to.eql("Im here for testing");
  });
});
