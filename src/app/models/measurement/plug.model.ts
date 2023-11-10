import { DeviceType } from "../device-type.model";

export interface Plug {
    id: number;
    name: string;
    powerOn: boolean;
    outletIdentifier: string;
    hubId: number;
    deviceTypes: DeviceType[];
}
