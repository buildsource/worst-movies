import axios from 'axios';
import { YearApiResponse } from '../interfaces/YearData';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchYearsWithMultipleWinners = async (): Promise<YearApiResponse> => {
    try {
        const response = await axios.get<YearApiResponse>(`${API_URL}?projection=years-with-multiple-winners`);
        return response.data;

    } catch (error) {
        console.error('Error fetching winners by year search:', error);
        throw error;
    }
};