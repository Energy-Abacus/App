import { Plug } from "./measurement/plug.model";

export interface DeviceType {

    id: number;
    name: string;
    icon: string;
    outlets: Plug[];
}
