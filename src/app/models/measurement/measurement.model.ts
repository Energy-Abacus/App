export interface Measurement {
    id: number;
    timestamp: string;
    powerOn: boolean;
    wattPower: number;
    wattMinutePower: number;
    temperature: number;
    outletId: number;
}
