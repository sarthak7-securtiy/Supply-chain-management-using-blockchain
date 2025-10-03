// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum State { Created, InTransit, Delivered }
    struct Batch {
        uint id;
        string product;
        address owner;
        State state;
    }

    mapping(uint => Batch) public batches;
    uint public nextBatchId;

    event BatchCreated(uint id, string product, address owner);
    event OwnershipTransferred(uint id, address from, address to);
    event StateUpdated(uint id, State state);

    function createBatch(string memory product) public {
        batches[nextBatchId] = Batch(nextBatchId, product, msg.sender, State.Created);
        emit BatchCreated(nextBatchId, product, msg.sender);
        nextBatchId++;
    }

    function transferOwnership(uint batchId, address newOwner) public {
        require(batches[batchId].owner == msg.sender, "Not owner");
        batches[batchId].owner = newOwner;
        emit OwnershipTransferred(batchId, msg.sender, newOwner);
    }

    function updateState(uint batchId, State state) public {
        require(batches[batchId].owner == msg.sender, "Not owner");
        batches[batchId].state = state;
        emit StateUpdated(batchId, state);
    }

    function getBatch(uint batchId) public view returns (Batch memory) {
        return batches[batchId];
    }
}
