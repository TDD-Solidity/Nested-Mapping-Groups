// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./core/GroupsBase.sol";

contract Users is GroupsBase {
    
    function addUserToGroup(uint256 groupId, address account)
        external
        onlyOwner
    {
        if (nextUserIndex[groupId] == 0) {
            nextUserIndex[groupId]++;
        }

        userBook[groupId][account] = nextUserIndex[groupId];

        nextUserIndex[groupId]++;
    }

    function indexForUser(uint256 groupId, address account)
        internal
        view
        returns (uint256)
    {
        return userBook[groupId][account];
    }

    function isInGroup(uint256 groupId) external view returns (bool) {
        return userBook[groupId][msg.sender] > 0;
    }

    function myIndex(uint256 groupId) external view returns (uint256) {
        return userBook[groupId][msg.sender];
    }
}
