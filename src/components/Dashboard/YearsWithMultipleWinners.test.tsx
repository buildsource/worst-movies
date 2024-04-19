import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import YearsWithMultipleWinners from './YearsWithMultipleWinners';
import { fetchYearsWithMultipleWinners } from '../../repositories/YearsWithMultipleWinnersRepository';
import { IYearData } from '../../interfaces/YearData';

vi.mock('../../repositories/YearsWithMultipleWinnersRepository');

const mockYears: IYearData[] = [
    { year: 2020, winnerCount: 3 },
    { year: 2019, winnerCount: 2 },
    { year: 2018, winnerCount: 4 },
    { year: 2017, winnerCount: 3 },
    { year: 2016, winnerCount: 2 },
    { year: 2015, winnerCount: 1 },
    { year: 2014, winnerCount: 5 },
    { year: 2013, winnerCount: 6 },
];

describe('YearsWithMultipleWinners Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetchYearsWithMultipleWinners as Mock).mockResolvedValue({
            totalElements: mockYears.length,
            years: mockYears,
        });
    });

    it('should load and display the table of years with multiple winners successfully', async () => {
        render(<YearsWithMultipleWinners />);
        await waitFor(() =>
            expect(screen.getByText('2020')).toBeInTheDocument(),
        );
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('2018')).toBeInTheDocument();
    });

    it('should display an error message when data fetch fails', async () => {
        (fetchYearsWithMultipleWinners as Mock).mockRejectedValue(
            new Error('Failed to fetch'),
        );
        render(<YearsWithMultipleWinners />);
        await waitFor(() =>
            expect(
                screen.getByText(/failed to fetch data/i),
            ).toBeInTheDocument(),
        );
    });

    it('should verify the sorting functionality by year', async () => {
        render(<YearsWithMultipleWinners />);
        await waitFor(() => screen.getByText('2020'));
        const yearHeader = screen.getByText('Year');
        fireEvent.click(yearHeader);
        await waitFor(() => {
            const firstRow = screen.getAllByRole('row')[1];
            expect(firstRow.textContent).toContain('2013');
        });
    });

    it('should test the pagination functionality', async () => {
        render(<YearsWithMultipleWinners />);

        await waitFor(() =>
            expect(screen.getByText('2020')).toBeInTheDocument(),
        );

        const nextPageButton = screen.getByTitle('Next Page');
        expect(nextPageButton).not.toBeDisabled();

        fireEvent.click(nextPageButton);

        await waitFor(() => {
            expect(screen.getByText('2014')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
        });
    });
});
