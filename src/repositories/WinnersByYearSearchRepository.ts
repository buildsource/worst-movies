import axios from 'axios';
import { IFetchMoviesParams, IMovieApiResponse } from '../interfaces/Movie';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchWinnersByYearSearchRepository = async (params: IFetchMoviesParams): Promise<IMovieApiResponse> => {
    try {
        const { page, pageSize, year } = params;
    const yearParam = year ? `&year=${year}` : '';

        const response = await axios.get<IMovieApiResponse>(`${API_URL}?page=${page - 1}&size=${pageSize}&winner=true${yearParam}`);            

        return response.data;
    } catch (error) {
        console.error('Error fetching winners by year search:', error);
        throw error;
    } 
};