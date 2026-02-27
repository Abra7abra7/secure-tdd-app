import React from 'react';
import { LiveContractsWidget } from './widgets/LiveContractsWidget';
import './Dashboard.css';

export const DashboardGrid: React.FC = () => {
    return (
        <div className="pt-intel-dashboard" data-testid="dashboard-grid">
            <div className="pt-dashboard-header">
                <h2 className="pt-intel-title">SR GLOBAL SITUATION <span className="pt-live-indicator">● LIVE</span></h2>
                <div className="pt-intel-timestamp">{new Date().toUTCString()}</div>
            </div>

            <div className="pt-grid-container">
                {/* Main large widget */}
                <div className="pt-widget pt-widget-large">
                    <div className="pt-widget-header">
                        <span className="pt-widget-icon">🌍</span>
                        <span className="pt-widget-title">GLOBAL SITUATION (MAPA SR)</span>
                    </div>
                    <div className="pt-widget-content pt-map-placeholder">
                        <div className="pt-loader-ring"></div>
                        <span className="pt-loader-text">Loading geographical data...</span>
                    </div>
                </div>

                {/* Right column top widget */}
                <div className="pt-widget">
                    <div className="pt-widget-header">
                        <span className="pt-widget-icon">⚡</span>
                        <span className="pt-widget-title">ECONOMIC INDICATORS</span>
                    </div>
                    <div className="pt-widget-content">
                        <ul className="pt-indicator-list">
                            <li>
                                <span className="pt-label">State Budget Balance</span>
                                <span className="pt-value pt-text-danger">-1.24B €</span>
                            </li>
                            <li>
                                <span className="pt-label">EU Funds Drawdown</span>
                                <span className="pt-value pt-text-warning">42.5%</span>
                            </li>
                            <li>
                                <span className="pt-label">Active Procurements</span>
                                <span className="pt-value pt-text-safe">1,204</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right column middle widget - Live Contracts */}
                <div className="pt-widget pt-widget-contracts">
                    <LiveContractsWidget />
                </div>

                {/* Bottom row widgets */}
                <div className="pt-widget">
                    <div className="pt-widget-header">
                        <span className="pt-widget-icon">⚠️</span>
                        <span className="pt-widget-title">RISK RADAR</span>
                    </div>
                    <div className="pt-widget-content pt-center-content">
                        <div className="pt-risk-score pt-text-danger">87</div>
                        <div className="pt-risk-label">High Alert (Entities)</div>
                    </div>
                </div>

                <div className="pt-widget">
                    <div className="pt-widget-header">
                        <span className="pt-widget-icon">📊</span>
                        <span className="pt-widget-title">SECTOR HEATMAP</span>
                    </div>
                    <div className="pt-widget-content">
                        <div className="pt-heatmap-grid">
                            <div className="pt-heat-block pt-bg-danger">ZDRAVOTNICTVO +14%</div>
                            <div className="pt-heat-block pt-bg-safe">SKOLSTVO -2%</div>
                            <div className="pt-heat-block pt-bg-warning">DOPRAVA +5%</div>
                            <div className="pt-heat-block pt-bg-safe">OBRANA -1%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
