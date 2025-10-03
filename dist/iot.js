export class IoTManager {
    constructor() {
        this.sensorEvents = [];
    }
    logSensorData(data) {
        this.sensorEvents.push(data);
    }
    getSensorEvents() {
        return this.sensorEvents;
    }
}
