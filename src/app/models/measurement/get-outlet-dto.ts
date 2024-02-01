export interface GetOutletDto {
    id: number,
    name: string,
    outletIdentifier: string,
    hubId: number,
    powerOn: boolean,
    totalPowerUsed: number,
    avgPowerUsed: number
}
