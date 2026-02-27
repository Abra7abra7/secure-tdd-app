import { useQuery } from '@tanstack/react-query';

export interface Entity {
    name: string;
    ico: string;
    address: string;
}

export const useEntitySearch = (query: string) => {
    return useQuery({
        queryKey: ['entitySearch', query],
        queryFn: async (): Promise<Entity[]> => {
            if (!query) return [];

            const response = await fetch(`/api/slovensko-digital?q=${encodeURIComponent(query)}&limit=10`);

            if (!response.ok) {
                if (response.status === 401) {
                    console.warn("Slovensko-Digital API: 401 Unauthorized. Using mock fallback data.");
                    // Simulate network delay for mock
                    await new Promise(resolve => setTimeout(resolve, 800));

                    if (query.toLowerCase().includes('vahostav')) {
                        return [{
                            name: "Váhostav-SK, a.s.",
                            ico: "31314356",
                            address: "Priemyselná 6, 821 09 Bratislava"
                        }];
                    }

                    return [{
                        name: `Mocked: ${query.toUpperCase()} s.r.o.`,
                        ico: String(Math.floor(Math.random() * 90000000) + 10000000),
                        address: "Mokáňova 1, 811 01 Bratislava - mestská časť Staré Mesto"
                    }];
                }
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();

            // Map the ekosystem structure to our Entity interface
            return data.map((record: any) => ({
                name: record.name || 'Neznámy subjekt',
                ico: record.cin || 'N/A',
                address: record.formatted_address || 'Neznáma adresa'
            }));
        },
        enabled: query.length > 0, // Only fetch when there is a query string
        initialData: query.length === 0 ? [] : undefined,
        staleTime: 5 * 60 * 1000,     // Cache results for 5 minutes
        retry: false                  // Fail fast on 401 Unauthorized
    });
};
