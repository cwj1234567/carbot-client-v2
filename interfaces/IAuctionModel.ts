interface IAuctionModel {
    auctionId: string
    vehicleId: number
    make: string
    model: string
    year: number
    bidValue: number
    endDate: string
    marketplace: string
    auctionUrl: string
  }

export default IAuctionModel

