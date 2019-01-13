const Candidates = artifacts.require('Candidates');

module.exports = function(deployer) {
  deployer.deploy(Candidates);
};
