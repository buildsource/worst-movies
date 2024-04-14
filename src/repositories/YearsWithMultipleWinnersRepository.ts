import axios from 'axios';
import { YearApiResponse } from '../interfaces/YearData';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchYearsWithMultipleWinners = async (): Promise<YearApiResponse> => {
    try {
        const response = await axios.get<YearApiResponse>(`${API_URL}?projection=years-with-multiple-winners`);
        return response.data;
    } catch (error) {
        console.error('Error fetching years with multiple winners:', error);

        if (axios.isAxiosError(error))
            throw new Error(`Failed to fetch years data: ${error.response?.status} ${error.response?.statusText}`);
        else
            throw new Error('An unexpected error occurred while fetching years data');
    }
};
