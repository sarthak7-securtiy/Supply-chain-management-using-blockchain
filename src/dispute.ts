// Dispute resolution and arbitration for supply chain
export type Dispute = {
  id: string;
  transactionId: string;
  raisedBy: string;
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  resolution?: string;
  timestamp: number;
};

export class DisputeManager {
  private disputes: Dispute[] = [];

  raiseDispute(dispute: Dispute) {
    this.disputes.push(dispute);
  }

  resolveDispute(id: string, resolution: string) {
    const dispute = this.disputes.find(d => d.id === id);
    if (dispute) {
      dispute.status = 'resolved';
      dispute.resolution = resolution;
    }
  }

  rejectDispute(id: string, reason: string) {
    const dispute = this.disputes.find(d => d.id === id);
    if (dispute) {
      dispute.status = 'rejected';
      dispute.resolution = reason;
    }
  }

  getDisputes(status?: string): Dispute[] {
    if (status) {
      return this.disputes.filter(d => d.status === status);
    }
    return this.disputes;
  }
}
