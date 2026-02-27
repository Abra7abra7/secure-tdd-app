import React, { useState } from 'react';
import { Bot, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import './IntelligencePanel.css';

interface IntelligencePanelProps {
    entityName: string;
    entityIco: string;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ entityName, entityIco }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [report, setReport] = useState<string | null>(null);

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setLogs([
            `[SYS] INITIATING_SCRAPE_PROTOCOL for ${entityIco}`,
            `[AGENT] Gathering open source intelligence for ${entityName}`,
            `[AGENT] Scanning public procurement database (CRZ)...`,
            `[SYS] PRIORITIZING_THREATS algorithms engaged...`
        ]);

        // Mock an asynchronous agent process
        setTimeout(() => {
            setLogs(prev => [...prev, `[AGENT] Found 5 active contracts. Cross-referencing PEPs...`]);
        }, 1500);

        setTimeout(() => {
            setLogs(prev => [...prev, `[AGENT] Analysis complete. Compiling intelligence report...`]);
            setReport(`Risk Profile: MODERATE (65%)\nEntity has a high volume of state contracts. No direct PEP links detected in the primary board, but secondary associations found.`);
            setIsAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="intelligence-panel pt-card">
            <header className="panel-header">
                <h3 className="pt-heading"><Bot className="pt-icon" color="#00ff00" /> AI Profiling Agent</h3>
                <div className="target-info">Target: <span className="pt-monospace">{entityName} ({entityIco})</span></div>
            </header>

            {!isAnalyzing && !report && (
                <div className="panel-actions">
                    <button onClick={startAnalysis} className="pt-button pt-intent-success pt-fill">
                        <Cpu className="pt-icon" /> ⚡ Spusti Hĺbkovú Analýzu
                    </button>
                </div>
            )}

            {(isAnalyzing || logs.length > 0) && (
                <div className="terminal-window pt-card pt-elevation-0">
                    <div className="terminal-header">
                        <Terminal size={12} /> <span className="terminal-title">AGENT_V1.terminal</span>
                    </div>
                    <div className="terminal-body pt-monospace">
                        {logs.map((log, i) => (
                            <div key={i} className="terminal-line">{log}</div>
                        ))}
                        {isAnalyzing && <div className="terminal-cursor">_</div>}
                    </div>
                </div>
            )}

            {report && (
                <div className="report-window">
                    <h4 className="report-title"><ShieldAlert className="pt-icon" color="#ff9800" /> Executive Summary</h4>
                    <p className="report-content">{report}</p>
                </div>
            )}
        </div>
    );
};
