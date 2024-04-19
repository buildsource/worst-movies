import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ProducersWithWinInterval from './ProducersWithWinInterval';
import { fetchProducerIntervalsRepository } from '../../repositories/ProducersWithWinIntervalRepository';
import { IProducerIntervalResponse } from '../../interfaces/ProducerInterval';

vi.mock('../../repositories/ProducersWithWinIntervalRepository', () => ({
    fetchProducerIntervalsRepository: vi.fn(),
}));

describe('ProducersWithWinInterval Component Tests', () => {
    it('should display an error message when data fetching fails', async () => {
        const error = new Error('Failed to fetch');
        (fetchProducerIntervalsRepository as Mock).mockRejectedValue(error);
        render(<ProducersWithWinInterval />);

        await waitFor(() =>
            expect(screen.getByRole('alert')).toBeInTheDocument(),
        );
        expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
    });

    it('should load and display the producer interval data correctly', async () => {
        const testData: IProducerIntervalResponse = {
            min: [
                {
                    producer: 'John Doe',
                    interval: 2,
                    previousWin: 1998,
                    followingWin: 2000,
                },
            ],
            max: [
                {
                    producer: 'Jane Smith',
                    interval: 10,
                    previousWin: 1985,
                    followingWin: 1995,
                },
            ],
            totalElements: 2,
        };

        (fetchProducerIntervalsRepository as Mock).mockResolvedValue(testData);
        render(<ProducersWithWinInterval />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });
});
