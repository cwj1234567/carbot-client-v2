import IAuctionModel from "../IAuctionModel"

interface IAuctionResponse {
    items: IAuctionModel[]
    nextPage: string
}

export default IAuctionResponse
