import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import StudiosWithMostWins from './StudiosWithMostWins';
import { fetchStudiosWithMostWinsRepository } from '../../repositories/StudiosWithMostWinsRepository';
import { IStudio } from '../../interfaces/Studio';

vi.mock('../../repositories/StudiosWithMostWinsRepository');

const mockStudios: IStudio[] = [
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


describe('StudiosWithMostWins Component Tests', () => {
  beforeEach(() => {
    (fetchStudiosWithMostWinsRepository as Mock).mockResolvedValue({
      totalElements: mockStudios.length,
      studios: mockStudios
    });
  });

  it('should render the table and load initial studio data successfully', async () => {
    render(<StudiosWithMostWins />);
    await waitFor(() => {
      expect(screen.getByText('Studio Ghibli')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('Pixar')).toBeInTheDocument();
    });
  });

  it('should display an error message when the data fetch fails', async () => {
    const error = new Error('Failed to fetch');
    (fetchStudiosWithMostWinsRepository as Mock).mockRejectedValue(error);
    render(<StudiosWithMostWins />);
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
    });
  });

  it('should verify the sorting functionality by studio name', async () => {
    render(<StudiosWithMostWins />);
    await waitFor(() => screen.getByText('Studio Ghibli'));
    const nameHeader = screen.getByText('Studio Name');
    fireEvent.click(nameHeader);
    await waitFor(() => {
      const firstRow = screen.getAllByRole('row')[1];
      expect(firstRow.textContent).toContain('Blue Sky Studios');
    });
  });

  it('should test the pagination functionality effectively', async () => {
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
