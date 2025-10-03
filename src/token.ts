// Tokenization and incentive system for supply chain
export type TokenTransaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  reason: string;
  timestamp: number;
};

export class TokenManager {
  private balances: Map<string, number> = new Map();
  private transactions: TokenTransaction[] = [];

  transfer(from: string, to: string, amount: number, reason: string, timestamp: number) {
    this.balances.set(from, (this.balances.get(from) || 0) - amount);
    this.balances.set(to, (this.balances.get(to) || 0) + amount);
    const id = `${from}-${to}-${timestamp}`;
    this.transactions.push({ id, from, to, amount, reason, timestamp });
  }

  getBalance(participantId: string): number {
    return this.balances.get(participantId) || 0;
  }

  getTransactions(participantId?: string): TokenTransaction[] {
    if (participantId) {
      return this.transactions.filter(t => t.from === participantId || t.to === participantId);
    }
    return this.transactions;
  }
}
