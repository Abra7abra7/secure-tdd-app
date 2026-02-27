import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar Component', () => {
    it('renders all main navigation links', () => {
        render(<Sidebar />);

        // Check if main modules are present in the sidebar
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Zmluvy a Obstarávania/i)).toBeInTheDocument();
        expect(screen.getByText(/Subjekty/i)).toBeInTheDocument();
        expect(screen.getByText(/Analýza Prepojení/i)).toBeInTheDocument();
    });

    it('contains navigation links', () => {
        render(<Sidebar />);
        const links = screen.getAllByRole('link');
        // At least 4 links requested above
        expect(links.length).toBeGreaterThanOrEqual(4);
    });
});
