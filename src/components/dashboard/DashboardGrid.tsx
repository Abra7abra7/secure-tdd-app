import React, { useState } from 'react';
import { LiveContractsWidget } from './widgets/LiveContractsWidget';
import { AlertsWidget } from './widgets/AlertsWidget';
import { useContracts } from '../../api/useContracts';
import { Search, Activity, AlertCircle, Euro } from 'lucide-react';
import './Dashboard.css';

export const DashboardGrid: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: contracts, isLoading } = useContracts();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('sk-SK', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const totalValue = contracts?.reduce((sum, c) => sum + c.sum, 0) || 0;
    const contractCount = contracts?.length || 0;
    const avgValue = contractCount > 0 ? totalValue / contractCount : 0;

    return (
        <div className="pt-intel-dashboard" data-testid="dashboard-grid">
            <div className="pt-dashboard-header">
                <div>
                    <h2 className="pt-intel-title">C.O.R.E. OSINT DASHBOARD <span className="pt-live-indicator">● LIVE</span></h2>
                    <div className="pt-intel-timestamp">{new Date().toUTCString()}</div>
                </div>

                <div className="pt-omnibox">
                    <Search className="omnibox-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search global ontology (Entities, Contracts, Nodes)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pt-input omnibox-input pt-monospace"
                    />
                </div>
            </div>

            <div className="pt-kpi-row">
                <div className="pt-kpi-card">
                    <div className="kpi-icon"><Activity size={24} className="pt-text-safe" /></div>
                    <div className="kpi-content">
                        <div className="kpi-label">MONITORED CONTRACTS</div>
                        <div className="kpi-value">{isLoading ? '---' : contractCount}</div>
                    </div>
                </div>
                <div className="pt-kpi-card">
                    <div className="kpi-icon"><Euro size={24} className="pt-text-warning" /></div>
                    <div className="kpi-content">
                        <div className="kpi-label">TOTAL VOLUME (FEED)</div>
                        <div className="kpi-value">{isLoading ? '---' : formatCurrency(totalValue)}</div>
                    </div>
                </div>
                <div className="pt-kpi-card">
                    <div className="kpi-icon"><AlertCircle size={24} className="pt-text-danger" /></div>
                    <div className="kpi-content">
                        <div className="kpi-label">AVERAGE TICKET</div>
                        <div className="kpi-value">{isLoading ? '---' : formatCurrency(avgValue)}</div>
                    </div>
                </div>
            </div>

            <div className="pt-grid-container custom-grid-layout">
                <div className="pt-widget pt-widget-large">
                    <div className="pt-widget-header">
                        <span className="pt-widget-icon">⚠️</span>
                        <span className="pt-widget-title">HIGH-VALUE ANOMALIES (RISK RADAR)</span>
                    </div>
                    <div className="pt-widget-content pt-no-padding">
                        <AlertsWidget />
                    </div>
                </div>

                <div className="pt-widget pt-widget-contracts">
                    <LiveContractsWidget />
                </div>
            </div>
        </div>
    );
};
