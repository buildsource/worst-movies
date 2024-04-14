import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import StudiosWithMostWins from './StudiosWithMostWins';
import { fetchStudiosWithMostWinsRepository } from '../../repositories/StudiosWithMostWinsRepository';
import { IStudioResponse } from '../../interfaces/Studio';

vi.mock('../../repositories/StudiosWithMostWinsRepository');

const mockStudios: IStudioResponse[] = [
  { name: 'Studio Ghibli', winCount: 15 },
  { name: 'Pixar', winCount: 12 },
  { name: 'DreamWorks', winCount: 8 },
  { name: 'Blue Sky Studios', winCount: 7 },
  { name: 'Sony Pictures Animation', winCount: 5 },
  { name: 'Illumination', winCount: 4 },
  { name: 'Cartoon Network Studios', winCount: 3 },
  { name: 'Nickelodeon Animation Studio', winCount: 2 },
  { name: 'Walt Disney Animation Studios', winCount: 10 },
  { name: 'Warner Bros. Animation', winCount: 6 }
];

describe('StudiosWithMostWins Component', () => {
  beforeEach(() => {
    (fetchStudiosWithMostWinsRepository as vi.Mock).mockResolvedValue({
      totalElements: mockStudios.length,
      studios: mockStudios
    });
  });

  it('carrega e exibe a tabela de estúdios com sucesso', async () => {
    render(<StudiosWithMostWins />);
    await waitFor(() => expect(screen.getByText('Studio Ghibli')).toBeInTheDocument());
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Pixar')).toBeInTheDocument();
  });

  it('exibe uma mensagem de erro quando a requisição falha', async () => {
    const error = new Error('Failed to fetch');

    (fetchStudiosWithMostWinsRepository as vi.Mock).mockRejectedValue(error);
    render(<StudiosWithMostWins />);
    await waitFor(() => expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument());
  });

  it('verifica a funcionalidade de ordenação', async () => {
    render(<StudiosWithMostWins />);
    await waitFor(() => screen.getByText('Studio Ghibli'));
    const nameHeader = screen.getByText('Studio Name');
    fireEvent.click(nameHeader);
    await waitFor(() => {
      const firstRow = screen.getAllByRole('row')[1];
      expect(firstRow.textContent).toContain('Blue Sky Studios');
    });
  });

  it('testa a funcionalidade de paginação', async () => {
    render(<StudiosWithMostWins />);

    await waitFor(() => expect(screen.getByText('Studio Ghibli')).toBeInTheDocument());

    const nextPageButton = screen.getByTitle('Next Page');
    expect(nextPageButton).not.toBeDisabled();

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Cartoon Network Studios')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument(); 
    });
  });
});