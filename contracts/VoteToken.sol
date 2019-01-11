pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract VoteToken is ERC20 {
    constructor () public {
        _mint(msg.sender, 10);
    }
}