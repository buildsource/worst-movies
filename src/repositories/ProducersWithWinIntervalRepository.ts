import axios from 'axios';
import { IProducerIntervalResponse } from '../interfaces/ProducerInterval';

const API_URL = `${import.meta.env.VITE_API_URL}/backend-java/api/movies`;

export const fetchProducerIntervalsRepository = async (): Promise<IProducerIntervalResponse> => {
    try {
        const response = await axios.get<IProducerIntervalResponse>(`${API_URL}?projection=max-min-win-interval-for-producers`);

        return response.data;
    } catch (error) {
        console.error('Error fetching producer intervals:', error);
        throw error;
    }
};