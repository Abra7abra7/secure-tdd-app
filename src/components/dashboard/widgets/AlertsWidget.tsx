import React from 'react';
import { useContracts } from '../../../api/useContracts';
import { AlertTriangle } from 'lucide-react';

export const AlertsWidget: React.FC = () => {
    const { data: contracts, isLoading } = useContracts();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('sk-SK', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (isLoading) return <div className="pt-loader-text">Analyzing risk...</div>;

    // Find high value contracts (e.g. over 100,000)
    const highValueContracts = contracts?.filter(c => c.sum > 100000).sort((a, b) => b.sum - a.sum).slice(0, 3) || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', padding: '16px' }}>
            {highValueContracts.length === 0 ? (
                <div className="pt-text-safe">No high-risk external movements detected.</div>
            ) : (
                highValueContracts.map(c => (
                    <div key={c.id} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12px', borderBottom: '1px solid var(--pt-color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="pt-text-danger" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={14} /> TIER-1 TRANSACTION
                            </span>
                            <span className="pt-text-danger">{formatCurrency(c.sum)}</span>
                        </div>
                        <div style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--pt-color-text-base)' }}>{c.title}</div>
                        <div style={{ marginTop: '2px', fontSize: '0.8rem', color: 'var(--pt-color-text-muted)' }} className="pt-monospace">
                            ID: {c.id} | ENTITY: REDACTED
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
