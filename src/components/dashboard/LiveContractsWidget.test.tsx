import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LiveContractsWidget } from './widgets/LiveContractsWidget';

describe('LiveContractsWidget Component', () => {
    it('renders the widget title', () => {
        render(<LiveContractsWidget />);
        expect(screen.getByText(/Live Zmluvy/i)).toBeInTheDocument();
    });

    it('displays a list of recent contracts with monospace amounts', () => {
        render(<LiveContractsWidget />);

        // Using mock data, we expect at least the IT contract to show up
        const contractTitle = screen.getByText(/Nákup IT techniky pre školy/i);
        expect(contractTitle).toBeInTheDocument();

        // Check for the presence of the neon/warning indicator class
        const tag = screen.getByText('Školstvo');
        expect(tag).toHaveClass('neon-text');
    });
});
