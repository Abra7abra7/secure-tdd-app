import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardGrid } from './DashboardGrid';

describe('DashboardGrid Component', () => {
    it('renders the grid container', () => {
        render(<DashboardGrid />);
        const grid = screen.getByTestId('dashboard-grid');
        expect(grid).toBeInTheDocument();
    });

    it('renders the expected widgets', () => {
        render(<DashboardGrid />);

        // Check if key intelligence widgets are rendered
        expect(screen.getByText(/Live Zmluvy/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Global Situation/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Economic Indicators/i)).toBeInTheDocument();
    });
});
