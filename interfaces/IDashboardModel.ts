
interface IDashboardModel
 {
    vehicleId: number,
    vehicleMake: string,
    vehicleModel: string,
    medianPrice90Days: number,
    medianPrice365Days: number,
    pctChangeMedianPrice90Days: number,
    pctChangeMedianPrice365Days: number,
    volume90Days: number

}

export default IDashboardModel;