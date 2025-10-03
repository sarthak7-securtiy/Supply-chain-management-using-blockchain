// Multi-chain interoperability simulation
export type ExternalChainEvent = {
  chainName: string;
  eventId: string;
  data: any;
  timestamp: number;
};

export class InteropManager {
  private events: ExternalChainEvent[] = [];

  recordEvent(event: ExternalChainEvent) {
    this.events.push(event);
  }

  getEvents(chainName?: string): ExternalChainEvent[] {
    if (chainName) {
      return this.events.filter(e => e.chainName === chainName);
    }
    return this.events;
  }
}
