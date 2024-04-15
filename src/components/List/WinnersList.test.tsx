import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WinnersList from './WinnersList';
import { fetchWinnersByYearSearchRepository } from '../../repositories/WinnersByYearSearchRepository';
import { IMovie } from '../../interfaces/Movie';

vi.mock('../../repositories/WinnersByYearSearchRepository');

const mockMovies: IMovie[] = [
    { id: 1, title: 'Movie One', year: 2019, studios: ['Studio One'], producers: ['Producer One'], winner: true },
    { id: 2, title: 'Movie Two', year: 2018, studios: ['Studio Two'], producers: ['Producer Two'], winner: false },
    { id: 3, title: 'Movie Three', year: 2017, studios: ['Studio Three'], producers: ['Producer Three'], winner: true },
    { id: 4, title: 'Movie Four', year: 2016, studios: ['Studio Four'], producers: ['Producer Four'], winner: false },
    { id: 5, title: 'Movie Five', year: 2015, studios: ['Studio Five'], producers: ['Producer Five'], winner: true },
    { id: 6, title: 'Movie Six', year: 2014, studios: ['Studio Six'], producers: ['Producer Six'], winner: false },
    { id: 7, title: 'Movie Seven', year: 2013, studios: ['Studio Seven'], producers: ['Producer Seven'], winner: true },
    { id: 8, title: 'Movie Eight', year: 2012, studios: ['Studio Eight'], producers: ['Producer Eight'], winner: false },
    { id: 9, title: 'Movie Nine', year: 2011, studios: ['Studio Nine'], producers: ['Producer Nine'], winner: true },
    { id: 10, title: 'Movie Ten', year: 2010, studios: ['Studio Ten'], producers: ['Producer Ten'], winner: false }
];


describe('WinnersList Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetchWinnersByYearSearchRepository as Mock).mockResolvedValue({
            content: mockMovies,
            totalElements: mockMovies.length
        });
    });

    it('should render the table and load initial data successfully', async () => {
        render(<WinnersList />);
        await waitFor(() => {
            expect(screen.getByText('Movie One')).toBeInTheDocument();
        });
    });

    it('should display an error message when data fetch fails', async () => {
        (fetchWinnersByYearSearchRepository as Mock).mockRejectedValue(new Error('Failed to fetch'));
        render(<WinnersList />);
        await waitFor(() => {
            expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
        });
    });

    it('should allow sorting by title', async () => {
        render(<WinnersList />);
        await waitFor(() => screen.getByText('Movie One'));
        const titleHeader = screen.getByText('Title');
        fireEvent.click(titleHeader);
        await waitFor(() => {
            const firstRow = screen.getAllByRole('row')[1];
            expect(firstRow.textContent).toContain('Movie Eight');
        });
    });

    it('should support pagination functionality', async () => {
        render(<WinnersList />);

        await waitFor(() => expect(screen.getByText('2019')).toBeInTheDocument());

        const nextPageButton = screen.getByTitle('Next Page');
        expect(nextPageButton).not.toBeDisabled();

        fireEvent.click(nextPageButton);

        await waitFor(() => {
            expect(screen.getByText('Movie Seven')).toBeInTheDocument();
            expect(screen.getByText('2013')).toBeInTheDocument();
        });
    });

    it('should update the table when setting filters from the dropdown', async () => {
        render(<WinnersList />);

        const filterIcons = screen.getAllByLabelText('filter');

        if (filterIcons.length > 0)
            fireEvent.click(filterIcons[0]);

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search year');
            fireEvent.change(searchInput, { target: { value: '2019' } });
            fireEvent.click(searchInput);
        });

        await waitFor(() => {
            expect(screen.getByText('Movie One')).toBeInTheDocument();
        });
    });

    it('should update the table when changing the winner filter to No', async () => {
        render(<WinnersList />);

        await waitFor(() => {
            expect(screen.getByText('Movie One')).toBeInTheDocument();
        });

        fireEvent.mouseDown(screen.getByRole('combobox'));
        const optionNo = await screen.findByRole('option', { name: 'No' });
        fireEvent.click(optionNo);

        await waitFor(() => {
            mockMovies.filter(movie => !movie.winner).forEach(movie => {
                expect(screen.getByText(movie.title)).toBeInTheDocument();
            });
        });
    });

    it('should update the table when changing the winner filter to Yes', async () => {
        render(<WinnersList />);

        await waitFor(() => {
            expect(screen.getByText('Movie One')).toBeInTheDocument();
        });

        fireEvent.mouseDown(screen.getByRole('combobox'));
        const optionYes = await screen.findByRole('option', { name: 'Yes' });
        fireEvent.click(optionYes);

        await waitFor(() => {
            mockMovies.filter(movie => movie.winner).forEach(movie => {
                expect(screen.getByText(movie.title)).toBeInTheDocument();
            });
        });
    });
});

