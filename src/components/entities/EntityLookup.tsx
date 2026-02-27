import React, { useState } from 'react';
import { useEntitySearch } from '../../api/useEntitySearch';
import { Search, Building2, MapPin, Hash, AlertTriangle, Loader2 } from 'lucide-react';
import './EntityLookup.css';

export interface EntityLookupProps {
    initialQuery?: string;
}

export const EntityLookup: React.FC<EntityLookupProps> = ({ initialQuery = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);

    // Update if initialQuery changes from outside (e.g. Omnibox search)
    React.useEffect(() => {
        if (initialQuery) {
            setSearchTerm(initialQuery);
        }
    }, [initialQuery]);

    // Simple debounce effect
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: entities, isLoading, isError, error } = useEntitySearch(debouncedTerm);

    return (
        <div className="entity-lookup-container">
            <header className="lookup-header">
                <h2 className="pt-heading"><Building2 className="pt-icon-large" /> Register Subjektov (Slovensko.Digital)</h2>
                <div className="search-box">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Zadajte IČO alebo Názov subjektu (napr. Vahostav)..."
                        className="pt-input search-input"
                    />
                </div>
            </header>

            <div className="lookup-content">
                {isLoading && (
                    <div className="pt-loading-state">
                        <Loader2 className="pt-spinner" />
                        <span>QUERYING_DATABASE...</span>
                    </div>
                )}

                {isError && (
                    <div className="pt-error-state">
                        <AlertTriangle className="pt-icon" />
                        <span>[ERROR] Database Query Failed: {error.message}</span>
                    </div>
                )}

                {!isLoading && !isError && entities && entities.length > 0 && (
                    <div className="entity-grid">
                        {entities.map((entity, idx) => (
                            <div key={idx} className="pt-card entity-card">
                                <h3 className="entity-name">{entity.name}</h3>
                                <div className="entity-details">
                                    <div className="detail-row">
                                        <Hash className="detail-icon" />
                                        <span className="detail-label">IČO:</span>
                                        <span className="detail-value pt-monospace">{entity.ico}</span>
                                    </div>
                                    <div className="detail-row">
                                        <MapPin className="detail-icon" />
                                        <span className="detail-label">Sídlo:</span>
                                        <span className="detail-value">{entity.address}</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="pt-button pt-intent-primary pt-small">Add to Graph</button>
                                    <button className="pt-button pt-minimal pt-small">View Contracts</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && !isError && debouncedTerm.length > 0 && (!entities || entities.length === 0) && (
                    <div className="pt-empty-state">
                        <span>NO_RECORDS_FOUND</span>
                    </div>
                )}

                {!isLoading && !isError && debouncedTerm.length === 0 && (
                    <div className="pt-empty-state" style={{ opacity: 0.5 }}>
                        <span>AWAITING_INPUT_QUERY...</span>
                    </div>
                )}
            </div>
        </div>
    );
};
