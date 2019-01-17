const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraApikey = '540b9d8e15344109bafbcebb786f6efe';
let mnemonic = require('./mnemonic');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraApikey}`
        );
      },
      network_id: 3,
      gas: 7000000, // default = 4712388
      gasPrice: 2000000000 // default = 100 gwei = 100000000000
    }
  }
};