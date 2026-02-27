import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContracts } from './useContracts';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useContracts API Hook', () => {
    beforeEach(() => {
        queryClient.clear();
        vi.restoreAllMocks();
    });

    it('fetches contracts successfully and maps them to our Contract type', async () => {
        // Mock successful JSONPlaceholder response
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ([
                { id: 1, title: "Nákup IT", body: "Test Firma\n...", userId: 10 }
            ])
        }));

        const { result } = renderHook(() => useContracts(), { wrapper });

        // Initially loading
        expect(result.current.isLoading).toBe(true);

        // Wait for fetch to finish
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toHaveLength(1);
        expect(result.current.data![0].supplier).toBe('Test Firma');
        expect(result.current.data![0].title).toBe('Nákup IT...');
        expect(result.current.data![0].category).toBe('IT a Bezpečnosť');
    });

    it('handles API errors gracefully', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

        const { result } = renderHook(() => useContracts(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBeInstanceOf(Error);
    });
});
