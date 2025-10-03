// Core blockchain logic for supply chain management
import crypto from 'crypto';

export type Transaction = {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  participants: string[];
};

export type Block = {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
};

export class Blockchain {
  public chain: Block[] = [];
  public pendingTransactions: Transaction[] = [];
  public participants: Set<string> = new Set();

  constructor() {
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock: Block = {
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

  calculateHash(block: Block): string {
    return crypto
      .createHash('sha256')
      .update(
        block.index +
          block.timestamp +
          JSON.stringify(block.transactions) +
          block.previousHash +
          block.nonce
      )
      .digest('hex');
  }

  addParticipant(id: string) {
    this.participants.add(id);
  }

  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(consensusParticipants: string[]): Block {
    // Simple consensus: require majority approval
    if (
      consensusParticipants.filter((p) => this.participants.has(p)).length <
      Math.ceil(this.participants.size / 2)
    ) {
      throw new Error('Consensus not reached');
    }
    const block: Block = {
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

  proofOfWork(block: Block): string {
    let hash = this.calculateHash(block);
    while (!hash.startsWith('0000')) {
      block.nonce++;
      hash = this.calculateHash(block);
    }
    return hash;
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== this.calculateHash(current)) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}
