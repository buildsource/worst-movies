export interface IStudio {
    name: string;
    winCount: number;
}

export interface IStudioResponse {
    studios: IStudio[];
    totalElements: number;
}