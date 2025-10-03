export class ReputationManager {
    constructor() {
        this.ratings = [];
    }
    addRating(rating) {
        this.ratings.push(rating);
    }
    getRatings(supplierId) {
        if (supplierId) {
            return this.ratings.filter(r => r.supplierId === supplierId);
        }
        return this.ratings;
    }
    getAverageScore(supplierId) {
        const ratings = this.getRatings(supplierId);
        if (ratings.length === 0)
            return 0;
        return ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
    }
}
