import React from 'react';
import { useContracts } from '../../../api/useContracts';

export const LiveContractsWidget: React.FC = () => {
    const { data: contracts, isLoading, isError } = useContracts();

    // Take only the top 4 most recent for the compact widget view
    const recentContracts = contracts ? contracts.slice(0, 4) : [];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('sk-SK', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <>
            <div className="pt-widget-header">
                <span className="pt-widget-icon">📄</span>
                <span className="pt-widget-title">LIVE ZMLUVY (CRZ FEED)</span>
                <span className="pt-badge">2 NEW</span>
            </div>
            <div className="pt-widget-content pt-no-padding">
                {isLoading && (
                    <div style={{ padding: '1rem', color: '#00ff00', fontFamily: 'monospace', textAlign: 'center' }}>[FETCHING_FEED]</div>
                )}
                {isError && (
                    <div style={{ padding: '1rem', color: '#ff0000', fontFamily: 'monospace', textAlign: 'center' }}>[FEED_ERROR]</div>
                )}
                {!isLoading && !isError && (
                    <ul className="pt-feed-list">
                        {recentContracts.map(contract => (
                            <li key={contract.id} className="pt-feed-item">
                                <div className="pt-feed-meta">
                                    <span className="pt-feed-id">{contract.id.slice(0, 8)}...</span>
                                    <span className="pt-feed-time">1 min ago</span>
                                </div>
                                <div className="pt-feed-title">{contract.title}</div>
                                <div className="pt-feed-footer">
                                    <span className="pt-feed-amount">{formatCurrency(contract.sum)}</span>
                                    <span className="pt-tag neon-text">{contract.category}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};
