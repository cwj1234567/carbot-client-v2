import IStatModel from "../IStatModel"

interface IStatResponse {
    price: IStatModel
    volume: IStatModel
    transactions: IStatModel
}

export default IStatResponse;
