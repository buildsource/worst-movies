import axios from 'axios';
import { IProducerIntervalResponse } from '../interfaces/ProducerInterval';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchProducerIntervalsRepository =
    async (): Promise<IProducerIntervalResponse> => {
        try {
            const response = await axios.get<IProducerIntervalResponse>(
                `${API_URL}?projection=max-min-win-interval-for-producers`,
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Error fetching producer intervals:',
                    error.message,
                );
                throw new Error(
                    `Failed to fetch data: ${error.response?.status} ${error.response?.statusText}`,
                );
            } else {
                console.error('An unexpected error occurred:', error);
                throw new Error('An unexpected error occurred');
            }
        }
    };
