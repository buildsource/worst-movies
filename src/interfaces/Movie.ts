export interface IMovie {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
}

export interface IFetchMoviesParams {
    page: number;
    pageSize: number;
    year?: string;
    winner?: boolean;
}

export interface IMovieApiResponse {
    content: IMovie[];
    totalElements: number;
}