// Core blockchain logic for supply chain management
import crypto from 'crypto';
export class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.participants = new Set();
        this.createGenesisBlock();
    }
    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: Date.now(),
            transactions: [],
            previousHash: '0',
            hash: '',
            nonce: 0,
        };
        genesisBlock.hash = this.calculateHash(genesisBlock);
        this.chain.push(genesisBlock);
    }
    calculateHash(block) {
        return crypto
            .createHash('sha256')
            .update(block.index +
            block.timestamp +
            JSON.stringify(block.transactions) +
            block.previousHash +
            block.nonce)
            .digest('hex');
    }
    addParticipant(id) {
        this.participants.add(id);
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    minePendingTransactions(consensusParticipants) {
        // Simple consensus: require majority approval
        if (consensusParticipants.filter((p) => this.participants.has(p)).length <
            Math.ceil(this.participants.size / 2)) {
            throw new Error('Consensus not reached');
        }
        const block = {
            index: this.chain.length,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            previousHash: this.chain[this.chain.length - 1].hash,
            hash: '',
            nonce: 0,
        };
        block.hash = this.proofOfWork(block);
        this.chain.push(block);
        this.pendingTransactions = [];
        return block;
    }
    proofOfWork(block) {
        let hash = this.calculateHash(block);
        while (!hash.startsWith('0000')) {
            block.nonce++;
            hash = this.calculateHash(block);
        }
        return hash;
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            if (current.hash !== this.calculateHash(current))
                return false;
            if (current.previousHash !== previous.hash)
                return false;
        }
        return true;
    }
}
