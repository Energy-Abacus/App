export interface Measurement {
    id: number;
    timeStamp: Date;
    powerOn: boolean;
    wattPower: number;
    totalPowerUsed: number;
    temperature: number;
    outletId: number;
}
