import axios from 'axios';
import { IStudioResponse } from '../interfaces/Studio';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchStudiosWithMostWinsRepository = async (): Promise<IStudioResponse> => {
    try {
        const response = await axios.get<IStudioResponse>(`${API_URL}?projection=studios-with-win-count`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching studios with most wins:', error.message);
            throw new Error(`Failed to fetch studios data: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred while fetching studios data');
        }
    }
};
