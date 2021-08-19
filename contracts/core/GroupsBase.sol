// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GroupsBase {

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    address public owner = msg.sender;

    // the nested mapping, groupId -> user address -> index for that user in data arrays
    mapping(uint256 => mapping(address => uint256)) userBook;

    // mapping from groupId to index for that user
    mapping(uint256 => uint256) nextUserIndex;

}
