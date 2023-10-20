export interface Plug {
    id: number;
    name: string;
    powerOn: boolean;
    outletIdentifier: string;
    hubId: number;
    deviceTypes: string[];
}
