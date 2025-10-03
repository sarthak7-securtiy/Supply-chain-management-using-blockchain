export class TokenManager {
    constructor() {
        this.balances = new Map();
        this.transactions = [];
    }
    transfer(from, to, amount, reason, timestamp) {
        this.balances.set(from, (this.balances.get(from) || 0) - amount);
        this.balances.set(to, (this.balances.get(to) || 0) + amount);
        const id = `${from}-${to}-${timestamp}`;
        this.transactions.push({ id, from, to, amount, reason, timestamp });
    }
    getBalance(participantId) {
        return this.balances.get(participantId) || 0;
    }
    getTransactions(participantId) {
        if (participantId) {
            return this.transactions.filter(t => t.from === participantId || t.to === participantId);
        }
        return this.transactions;
    }
}
