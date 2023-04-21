export interface Measurement {
    id: number;
    timestamp: Date;
    powerOn: boolean;
    wattPower: number;
    totalPowerUsed: number;
    temperature: number;
    outletId: number;
}
