import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';
import { mockContracts } from '../../data/mockContracts';

describe('DataTable Component', () => {
    it('renders the table with correct headers', () => {
        render(<DataTable data={mockContracts} />);

        expect(screen.getByText('ID Zmluvy')).toBeInTheDocument();
        expect(screen.getByText('Názov')).toBeInTheDocument();
        expect(screen.getByText('Objednávateľ')).toBeInTheDocument();
        expect(screen.getByText('Dodávateľ')).toBeInTheDocument();
        expect(screen.getByText('Suma (€)')).toBeInTheDocument();
    });

    it('renders data rows correctly', () => {
        render(<DataTable data={mockContracts} />);

        // Check if some specific mock data is rendered
        expect(screen.getByText('Nákup IT techniky pre školy')).toBeInTheDocument();
        expect(screen.getByText('TechCorp s.r.o.')).toBeInTheDocument();

        // Sum should be formatted
        expect(screen.getByText(/1 250 000/)).toBeInTheDocument();
    });

    it('filters data when searching', () => {
        render(<DataTable data={mockContracts} />);

        const searchInput = screen.getByPlaceholderText(/Filtrovať zmluvy/i);

        // Should initially show IT technika
        expect(screen.getByText('Nákup IT techniky pre školy')).toBeInTheDocument();

        // Filter by "Cesty"
        fireEvent.change(searchInput, { target: { value: 'Cesty' } });

        // Health/IT contracts should be hidden
        expect(screen.queryByText('Nákup IT techniky pre školy')).not.toBeInTheDocument();
        // But roads should still be there
        expect(screen.getByText('Oprava ciest 1. triedy - úsek A')).toBeInTheDocument();
    });
});
