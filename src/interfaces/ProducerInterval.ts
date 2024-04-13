export interface IProducerInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}


export interface IProducerIntervalResponse {
    min: IProducerInterval[];
    max: IProducerInterval[];
    totalElements: number;
}