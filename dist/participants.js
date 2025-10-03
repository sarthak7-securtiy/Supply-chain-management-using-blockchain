export class ParticipantRegistry {
    constructor() {
        this.participants = new Map();
    }
    addParticipant(participant) {
        this.participants.set(participant.id, participant);
    }
    getParticipant(id) {
        return this.participants.get(id);
    }
    getAllParticipants() {
        return Array.from(this.participants.values());
    }
}
