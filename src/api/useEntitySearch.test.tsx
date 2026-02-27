import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEntitySearch } from './useEntitySearch';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('useEntitySearch API Hook', () => {
    beforeEach(() => {
        queryClient.clear();
        vi.unstubAllGlobals();
    });

    it('returns empty array when query is empty', async () => {
        const { result } = renderHook(() => useEntitySearch(''), { wrapper });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual([]);
    });

    it('fetches entities successfully from slovensko.digital and maps structure', async () => {
        // Mock actual autoform.ekosystem response structure
        const mockResponse = [
            {
                id: 12345,
                name: "Testovacia Firma s.r.o.",
                cin: "12345678",
                formatted_address: "Testovacia 1, 811 01 Bratislava",
                legal_form: "Spoločnosť s ručením obmedzeným"
            }
        ];

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        }));

        const { result } = renderHook(() => useEntitySearch('Testovacia'), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toHaveLength(1);
        expect(result.current.data![0].name).toBe('Testovacia Firma s.r.o.');
        expect(result.current.data![0].ico).toBe('12345678');
        expect(result.current.data![0].address).toBe('Testovacia 1, 811 01 Bratislava');
    });

    it('handles API errors gracefully', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            statusText: 'Unauthorized'
        }));

        const { result } = renderHook(() => useEntitySearch('TajnySubjekt'), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe('API error: Unauthorized');
    });
});
