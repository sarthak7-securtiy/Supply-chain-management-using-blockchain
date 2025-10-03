export class InteropManager {
    constructor() {
        this.events = [];
    }
    recordEvent(event) {
        this.events.push(event);
    }
    getEvents(chainName) {
        if (chainName) {
            return this.events.filter(e => e.chainName === chainName);
        }
        return this.events;
    }
}
