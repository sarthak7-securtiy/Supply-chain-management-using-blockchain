// AI-powered analytics and anomaly detection for supply chain
import { Transaction } from './blockchain.js';

export class Analytics {
  // Simple anomaly detection: flag transactions with quantity far from mean
  static detectAnomalies(transactions: Transaction[]): Transaction[] {
    const quantities = transactions
      .map(t => t.data?.quantity)
      .filter(q => typeof q === 'number');
    if (quantities.length === 0) return [];
    const mean = quantities.reduce((a, b) => a + b, 0) / quantities.length;
    const std = Math.sqrt(
      quantities.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / quantities.length
    );
    // Flag transactions where quantity is more than 2 std devs from mean
    return transactions.filter(t => {
      const q = t.data?.quantity;
      return typeof q === 'number' && Math.abs(q - mean) > 2 * std;
    });
  }
}
