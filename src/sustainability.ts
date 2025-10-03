// Carbon footprint and sustainability tracking for supply chain
import { Transaction } from './blockchain.js';

export type SustainabilityMetric = {
  productId: string;
  carbonEmissions: number;
  waterUsage: number;
  ethicalSourcing: boolean;
  timestamp: number;
};

export class SustainabilityTracker {
  private metrics: SustainabilityMetric[] = [];

  recordMetric(metric: SustainabilityMetric) {
    this.metrics.push(metric);
  }

  getMetrics(productId?: string): SustainabilityMetric[] {
    if (productId) {
      return this.metrics.filter(m => m.productId === productId);
    }
    return this.metrics;
  }
}
