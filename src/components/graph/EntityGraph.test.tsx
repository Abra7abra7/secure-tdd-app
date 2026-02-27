import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EntityGraph } from './EntityGraph';

// Polyfill ResizeObserver which is missing in jsdom but required by ReactFlow
class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Polyfill DOMMatrix for ReactFlow
vi.stubGlobal('DOMMatrixReadOnly', class DOMMatrixReadOnly {
    m22 = 1;
    is2D = true;
});

describe('EntityGraph Component', () => {
    it('renders the graph container', () => {
        // Render without mock so it mounts properly
        render(<EntityGraph />);

        // Check if the overall container is there
        const container = screen.getByTestId('entity-graph-container');
        expect(container).toBeInTheDocument();
    });

    it('renders the graph intelligence controls', () => {
        render(<EntityGraph />);

        expect(screen.getByText(/Network Analysis/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search entities.../i)).toBeInTheDocument();
    });
});
