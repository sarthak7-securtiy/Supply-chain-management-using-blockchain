export class SustainabilityTracker {
    constructor() {
        this.metrics = [];
    }
    recordMetric(metric) {
        this.metrics.push(metric);
    }
    getMetrics(productId) {
        if (productId) {
            return this.metrics.filter(m => m.productId === productId);
        }
        return this.metrics;
    }
}
