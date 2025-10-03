// Supplier rating and reputation system for supply chain
export type Rating = {
  supplierId: string;
  ratedBy: string;
  score: number;
  feedback: string;
  timestamp: number;
};

export class ReputationManager {
  private ratings: Rating[] = [];

  addRating(rating: Rating) {
    this.ratings.push(rating);
  }

  getRatings(supplierId?: string): Rating[] {
    if (supplierId) {
      return this.ratings.filter(r => r.supplierId === supplierId);
    }
    return this.ratings;
  }

  getAverageScore(supplierId: string): number {
    const ratings = this.getRatings(supplierId);
    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
  }
}
