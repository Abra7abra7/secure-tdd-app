import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopBar } from './TopBar';

describe('TopBar Component', () => {
  it('renders the application title', () => {
    render(<TopBar />);
    expect(screen.getByText(/Slovak Data Analytics/i)).toBeInTheDocument();
  });

  it('contains a search input for global search', () => {
    render(<TopBar />);
    const searchInput = screen.getByPlaceholderText(/Search Anything/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('displays the user profile section', () => {
    render(<TopBar />);
    const profileButton = screen.getByRole('button', { name: /profile/i });
    expect(profileButton).toBeInTheDocument();
  });
});
