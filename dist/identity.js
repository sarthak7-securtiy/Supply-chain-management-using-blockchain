// Decentralized Identity & Access Management for supply chain
import crypto from 'crypto';
export class IdentityManager {
    constructor() {
        this.didRegistry = new Map();
    }
    createDID(participant) {
        const did = `did:supplychain:${crypto.randomUUID()}`;
        const publicKey = crypto.randomBytes(32).toString('hex');
        const identity = {
            did,
            publicKey,
            role: participant.role,
            participantId: participant.id,
        };
        this.didRegistry.set(did, identity);
        return identity;
    }
    getDID(did) {
        return this.didRegistry.get(did);
    }
    getAllDIDs() {
        return Array.from(this.didRegistry.values());
    }
}
