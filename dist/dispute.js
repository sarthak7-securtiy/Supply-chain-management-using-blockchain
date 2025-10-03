export class DisputeManager {
    constructor() {
        this.disputes = [];
    }
    raiseDispute(dispute) {
        this.disputes.push(dispute);
    }
    resolveDispute(id, resolution) {
        const dispute = this.disputes.find(d => d.id === id);
        if (dispute) {
            dispute.status = 'resolved';
            dispute.resolution = resolution;
        }
    }
    rejectDispute(id, reason) {
        const dispute = this.disputes.find(d => d.id === id);
        if (dispute) {
            dispute.status = 'rejected';
            dispute.resolution = reason;
        }
    }
    getDisputes(status) {
        if (status) {
            return this.disputes.filter(d => d.status === status);
        }
        return this.disputes;
    }
}
