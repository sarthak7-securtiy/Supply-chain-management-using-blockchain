// Participant management for permissioned blockchain
export type Participant = {
  id: string;
  name: string;
  role: 'supplier' | 'manufacturer' | 'logistics' | 'distributor' | 'retailer' | 'auditor';
};

export class ParticipantRegistry {
  private participants: Map<string, Participant> = new Map();

  addParticipant(participant: Participant) {
    this.participants.set(participant.id, participant);
  }

  getParticipant(id: string): Participant | undefined {
    return this.participants.get(id);
  }

  getAllParticipants(): Participant[] {
    return Array.from(this.participants.values());
  }
}
