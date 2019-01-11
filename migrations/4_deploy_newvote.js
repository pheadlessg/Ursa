const NewVote = artifacts.require('NewVote');

module.exports = function(deployer) {
  deployer.deploy(NewVote);
};
