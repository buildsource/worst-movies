import axios from 'axios';
import { IFetchMoviesParams, IMovieApiResponse } from '../interfaces/Movie';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchWinnersByYearSearchRepository = async (params: IFetchMoviesParams): Promise<IMovieApiResponse> => {
    try {
        const { page, pageSize, year, winner } = params;

        const queryParams = new URLSearchParams({
            page: (page - 1).toString(),
            size: pageSize.toString(),
        });

        if (winner !== undefined)
            queryParams.append('winner', winner.toString());

        if (year !== '')
            queryParams.append('year', year.toString());

        const response = await axios.get<IMovieApiResponse>(`${API_URL}?${queryParams.toString()}`);
        console.log(response.config.url);

        return response.data;
    } catch (error) {
        console.error('Error fetching winners by year search:', error);
        if (axios.isAxiosError(error))
            throw new Error(`Failed to fetch movie data: ${error.response?.status} ${error.response?.statusText}`);
        else
            throw new Error('An unexpected error occurred while fetching movie data');
    }
};
