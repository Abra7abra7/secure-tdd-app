import { useQuery } from '@tanstack/react-query';
import type { Contract } from '../data/mockContracts';



export const useContracts = () => {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: async (): Promise<Contract[]> => {
            const response = await fetch('/api/crz');

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();

            // Map JSONPlaceholder /posts format to our internal Contract structure
            // We use bodies and titles as dummy contract data
            return data.map((record: any) => ({
                id: `CRZ-2024-${record.id}`,
                title: record.title.slice(0, 30) + '...',
                supplier: record.body.split('\n')[0].slice(0, 20),
                sum: Math.floor(Math.random() * 50000) + 1000,
                date: new Date(Date.now() - record.id * 86400000).toISOString(),
                category: record.userId > 5 ? 'IT a Bezpečnosť' : 'Stavebníctvo',
            })).slice(0, 50); // limit to 50
        },
        staleTime: 60000, // cache for 1 minute
    });
};
