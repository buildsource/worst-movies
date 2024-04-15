import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WinnersByYearSearch from './WinnersByYearSearch';
import { fetchWinnersByYearSearchRepository } from '../../repositories/WinnersByYearSearchRepository';
import { IMovie } from '../../interfaces/Movie';

vi.mock('../../repositories/WinnersByYearSearchRepository');

const mockMovies: IMovie[] = [
    { id: 1, title: 'Movie One', year: 2019, studios: ['Studio One'], producers: ['Producer One'], winner: true },
    { id: 2, title: 'Movie Two', year: 2018, studios: ['Studio Two'], producers: ['Producer Two'], winner: true },
    { id: 3, title: 'Movie Three', year: 2017, studios: ['Studio Three'], producers: ['Producer Three'], winner: true },
    { id: 4, title: 'Movie Four', year: 2016, studios: ['Studio Four'], producers: ['Producer Four'], winner: true },
    { id: 5, title: 'Movie Five', year: 2015, studios: ['Studio Five'], producers: ['Producer Five'], winner: true },
    { id: 6, title: 'Movie Six', year: 2014, studios: ['Studio Six'], producers: ['Producer Six'], winner: true },
    { id: 7, title: 'Movie Seven', year: 2013, studios: ['Studio Seven'], producers: ['Producer Seven'], winner: true },
    { id: 8, title: 'Movie Eight', year: 2012, studios: ['Studio Eight'], producers: ['Producer Eight'], winner: true },
    { id: 9, title: 'Movie Nine', year: 2011, studios: ['Studio Nine'], producers: ['Producer Nine'], winner: true },
    { id: 10, title: 'Movie Ten', year: 2010, studios: ['Studio Ten'], producers: ['Producer Ten'], winner: true }
];

describe('WinnersByYearSearch Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetchWinnersByYearSearchRepository as Mock).mockResolvedValue({
            content: mockMovies,
            totalElements: mockMovies.length
        });
    });

    it('should render the table and load initial movie winners data successfully', async () => {
        render(<WinnersByYearSearch />);
        await waitFor(() => {
            expect(screen.getByText('Movie One')).toBeInTheDocument();
        });
    });

    it('should display an error message when the data fetch fails', async () => {
        (fetchWinnersByYearSearchRepository as Mock).mockRejectedValue(new Error('Failed to fetch'));
        render(<WinnersByYearSearch />);
        await waitFor(() => {
            expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
        });
    });

    it('should verify the sorting functionality by year', async () => {
        render(<WinnersByYearSearch />);
        await waitFor(() => screen.getByText('Movie One'));
        const yearHeader = screen.getByText('Year');
        fireEvent.click(yearHeader);
        await waitFor(() => {
            const firstRow = screen.getAllByRole('row')[1];
            expect(firstRow.textContent).toContain('Movie Ten');
        });
    });

    it('should test the pagination functionality effectively', async () => {
        render(<WinnersByYearSearch />);
        await waitFor(() => expect(screen.getByText('Movie One')).toBeInTheDocument());

        const nextPageButton = screen.getByTitle('Next Page');
        expect(nextPageButton).not.toBeDisabled();

        fireEvent.click(nextPageButton);

        await waitFor(() => {
            expect(screen.getByText('Movie Seven')).toBeInTheDocument();
            expect(screen.getByText('2013')).toBeInTheDocument();
        });
    });

    it('should allow searching by year and update the table accordingly', async () => {
        render(<WinnersByYearSearch />);
        const searchInput = screen.getByPlaceholderText('Search by year');
        const searchButton = screen.getByText('Search');
        fireEvent.change(searchInput, { target: { value: '2017' } });
        fireEvent.click(searchButton);
        await waitFor(() => {
            expect(screen.getByText('Movie Three')).toBeInTheDocument();
            expect(fetchWinnersByYearSearchRepository).toHaveBeenCalledWith({
                page: 1,
                pageSize: 5,
                year: '2017',
                winner: true,
            });
        });
    });
});
