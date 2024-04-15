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
    { year: 2013, winnerCount: 6 }
  ];

describe('YearsWithMultipleWinners Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchYearsWithMultipleWinners as Mock).mockResolvedValue({
      totalElements: mockYears.length,
      years: mockYears
    });
  });

  it('carrega e exibe a tabela de anos com múltiplos vencedores com sucesso', async () => {
    render(<YearsWithMultipleWinners />);
    await waitFor(() => expect(screen.getByText('2020')).toBeInTheDocument());
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
  });

  it('exibe uma mensagem de erro quando a requisição falha', async () => {
    (fetchYearsWithMultipleWinners as Mock).mockRejectedValue(new Error('Failed to fetch'));
    render(<YearsWithMultipleWinners />);
    await waitFor(() => expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument());
  });

  it('verifica a funcionalidade de ordenação', async () => {
    render(<YearsWithMultipleWinners />);
    await waitFor(() => screen.getByText('2020'));
    const yearHeader = screen.getByText('Year');
    fireEvent.click(yearHeader);
    await waitFor(() => {
      const firstRow = screen.getAllByRole('row')[1]; 
      expect(firstRow.textContent).toContain('2013');
    });
  });

  it('testa a funcionalidade de paginação', async () => {
    render(<YearsWithMultipleWinners />);

    await waitFor(() => expect(screen.getByText('2020')).toBeInTheDocument());

    const nextPageButton = screen.getByTitle('Next Page');
    expect(nextPageButton).not.toBeDisabled();

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('2014')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument(); 
    });
  });
});
