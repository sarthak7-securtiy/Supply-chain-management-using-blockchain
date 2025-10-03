// Decentralized Identity & Access Management for supply chain
import crypto from 'crypto';
import { Participant } from './participants.js';

export type DID = {
  did: string;
  publicKey: string;
  role: Participant['role'];
  participantId: string;
};

export class IdentityManager {
  private didRegistry: Map<string, DID> = new Map();

  createDID(participant: Participant): DID {
    const did = `did:supplychain:${crypto.randomUUID()}`;
    const publicKey = crypto.randomBytes(32).toString('hex');
    const identity: DID = {
      did,
      publicKey,
      role: participant.role,
      participantId: participant.id,
    };
    this.didRegistry.set(did, identity);
    return identity;
  }

  getDID(did: string): DID | undefined {
    return this.didRegistry.get(did);
  }

  getAllDIDs(): DID[] {
    return Array.from(this.didRegistry.values());
  }
}
