// IoT integration for supply chain blockchain
import { Transaction } from './blockchain.js';

export type SensorData = {
  deviceId: string;
  type: 'temperature' | 'humidity' | 'gps';
  value: number | string;
  timestamp: number;
  location?: string;
};

export class IoTManager {
  private sensorEvents: SensorData[] = [];

  logSensorData(data: SensorData) {
    this.sensorEvents.push(data);
  }

  getSensorEvents(): SensorData[] {
    return this.sensorEvents;
  }
}
