# Ursa

## A BlockChain Voting application built on Ethereum VM

Ursa is a decentralised application ([dapp](https://en.wikipedia.org/wiki/Decentralized_application)) built on the Ethereum platform which allows a user to create elections by entering a election name, expiration time, candidates and a whitelist of voter addresses. Whitelisted users can then vote once on a candidate in the election, which will end when the expiration time is reached. It provides a basic visual representation of votes cast in the UI in the form of a pie chart once votes are received.

### Prerequisites

[MetaMask](https://metamask.io/).
[Ganache](https://truffleframework.com/ganache) if you intend to only use the project locally for testing.

### Getting Started

Clone the the repo into your CLI and run

```
npm install
```

at root level to install all back end dependencies. Perform this again within the client folder to install all front end dependencies.

You will need to create a new file at root level of the project called

```
mnemonic.js
```

This file should contain the following code:

```js
module.exports = 'SEED WORDS HERE';
```

replacing 'SEED WORDS HERE' with the seed phrase from your MetaMask account.

DO NOT SHARE THESE KEY WORDS IF YOU DO NOT WANT SOMEONE ELSE GETTING ACCESS TO YOUR ACCOUNT.

#### Running Locally

Make sure Ganache is running and the port in Ganache matches that in both MetaMask and the truffle-config.js file at root level of the project.

Run

```
truffle compile
truffle migrate --reset
```

which will compile the contract and migrate it to your local Ganache blockchain.

Enter your client folder and run

```
npm start
```

to run the locally hosted React server which will serve up your project.

#### Running on Ropsten Test Network

Once you have installed MetaMask and created a new account, change your network to the Ropsten test network and visit the [Ropsten Ether Faucet](https://faucet.metamask.io/) to get some test ether. It may take a minute or two, but you should see some ether in your metamask wallet which will allow you to deploy and use the contract on Ropsten.

Make an account on [Infura](https://infura.io/), which will act as an API host for your project. Make a new project and copy the Project ID from its settings, making sure to replace the API key in truffle-config.js with your own.

Run

```
truffle compile
truffle deploy --network ropsten
```

which will migrate the contract to the Ropsten network.

Enter your client folder and run

```
npm start
```

to run the locally hosted React server which will serve up your project.

### Can I test it?

While the front end of the app is untested, developing the smart contract in solidity required extensive testing of functions using Truffle's native testing suite, which is built on [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

To access and perform these tests run

```
truffle test
```

from the CLI.

### Deployment

Deployment of the app requires that the contract is deployed to a live network such as the test networks Ropsten, Kovan or Rinkeby or the main ethereum network. Please follow the section of the Readme to ensure the contract is hosted on a live network before proceeding.

The app can be deployed easily using [Netlify](https://www.netlify.com/).

To deploy to your own netlify account, log in or create an account before following the next steps.

First, run the command

```
npm run build
```

in your CLI to make a production version of the app for deployment.

To install netlify commands globally on your system, enter

```
npm install netlify-cli -g
```

on your CLI, followed by

```
netlify deploy
```

which will log you into your netlify account through your browser. Choose to create & configure a new site, select which account you would like to deploy the app to and the site will be created as a draft for you to check over before finally committing it.

You should set your deploy folder as

```
./build
```

and the site should deploy for you to use.

There is a currently deployed version of this site available to use [here](https://kind-pasteur-8c8431.netlify.com/)

### Built With

- [NodeJS](https://nodejs.org/en/)

Back End

- [Truffle](https://truffleframework.com/truffle)
- [Ganache](https://truffleframework.com/ganache)
- [OpenZeppelin Tokens](https://openzeppelin.org/api/docs/get-started.html)

Front End

- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Drizzle](https://truffleframework.com/drizzle)
- [Moment](https://momentjs.com/)
- [Styled Components](https://www.styled-components.com/)

### Authors

[Xavier Bruggen](https://github.com/xavierTL)

[Ros Bell](https://github.com/rosbell)

[Brydie Caine](https://github.com/Bry-die)

[Bevan Swanson](https://github.com/BevRivling)

[Sean Fisher](https://github.com/pheadlessg)

### Acknowledgements

Andy Gray of [Blockrocket](http://www.blockrocket.tech/) who we're all eternally grateful to for providing his time and expertise while we made this project.

Everyone at [Northcoders](https://northcoders.com/), without whom we wouldn't be here making this project. Thanks for giving us the tools we need to be coders.
