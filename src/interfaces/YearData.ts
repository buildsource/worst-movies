export interface IYearData {
    year: number;
    winnerCount: number;
}

export interface YearApiResponse {
    years: IYearData[];
    totalElements: number;
}
