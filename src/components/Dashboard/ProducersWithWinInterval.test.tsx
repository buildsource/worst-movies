import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ProducersWithWinInterval from './ProducersWithWinInterval';
import { fetchProducerIntervalsRepository } from '../../repositories/ProducersWithWinIntervalRepository';

vi.mock('../../repositories/ProducersWithWinIntervalRepository', () => ({
  fetchProducerIntervalsRepository: vi.fn(),
}));



describe('ProducersWithWinInterval', () => {


  it('loads and displays data correctly', async () => {
    const testData = {
      min: [{ producer: 'John Doe', interval: 2, previousWin: 1998, followingWin: 2000 }],
      max: [{ producer: 'Jane Smith', interval: 10, previousWin: 1985, followingWin: 1995 }]
    };
    fetchProducerIntervalsRepository.mockResolvedValue(testData);
    render(<ProducersWithWinInterval />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
