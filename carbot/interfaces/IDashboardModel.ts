
interface IDashboardModel
 {
    vehicleId: number,
    name: string,
    medianPrice90Days: number,
    medianPrice365Days: number,
    pctChangeMedianPrice90Days: number,
    pctChangeMedianPrice365Days: number,
    volume90Days: number

}

export default IDashboardModel;