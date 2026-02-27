import React, { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from 'react-simple-maps';
import { Target, Activity } from 'lucide-react';
import './GeoMap.css';

const geoUrl = "/world-110m.json";

// Slovak cities used as intelligence hubs
const hubs = [
    { name: "Centrála BA", coordinates: [17.1077, 48.1486], status: "active", contracts: 1420 },
    { name: "Hub Košice", coordinates: [21.2611, 48.7164], status: "warning", contracts: 380 },
    { name: "Hub Žilina", coordinates: [18.7394, 49.2231], status: "active", contracts: 215 },
    { name: "Sektor BB", coordinates: [19.1462, 48.7363], status: "active", contracts: 410 },
];

export const GeoMap: React.FC = () => {
    const [selectedHub, setSelectedHub] = useState<any>(null);

    return (
        <div className="geomap-container">
            <header className="geomap-header">
                <h2 className="pt-heading"><Target className="pt-icon-large pulse-icon" /> Geopriestorový Vektor (Slovakia Region)</h2>
                <p className="pt-monospace text-muted">SYS: TOPOLOGICAL_ANALYSIS_ACTIVE | SAT_LINK: STB</p>
            </header>

            <div className="geomap-visual-area">
                <div className="map-frame">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 4500,
                            center: [19.5, 48.7] // Center on Slovakia
                        }}
                        className="interactive-map"
                    >
                        <ZoomableGroup zoom={1} maxZoom={4}>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const isSlovakia = geo.properties.name === "Slovakia";
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                className={`map-geography ${isSlovakia ? 'highlight-sk' : 'dim-others'}`}
                                            />
                                        );
                                    })
                                }
                            </Geographies>

                            {hubs.map((hub) => (
                                <Marker
                                    key={hub.name}
                                    coordinates={hub.coordinates as [number, number]}
                                    onClick={() => setSelectedHub(hub)}
                                >
                                    <g className={`map-marker ${hub.status === 'warning' ? 'marker-warn' : 'marker-ok'}`}>
                                        <circle cx="0" cy="0" r="4" fill="currentColor" />
                                        <circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="radar-ping" />
                                        <text
                                            textAnchor="middle"
                                            y={-15}
                                            className="marker-text pt-monospace"
                                        >
                                            {hub.name}
                                        </text>
                                    </g>
                                </Marker>
                            ))}
                        </ZoomableGroup>
                    </ComposableMap>
                </div>

                <div className="geomap-sidebar">
                    <div className="pt-card info-panel">
                        <h3 className="panel-title"><Activity className="pt-icon" /> HUB TELEMETRY</h3>

                        {selectedHub ? (
                            <div className="hub-details animated-entry">
                                <h4 className="hub-name">{selectedHub.name}</h4>
                                <div className="detail-grid pt-monospace">
                                    <span className="label">STATUS:</span>
                                    <span className={`value ${selectedHub.status === 'warning' ? 'text-warn' : 'text-ok'}`}>
                                        {selectedHub.status.toUpperCase()}
                                    </span>

                                    <span className="label">LAT/LNG:</span>
                                    <span className="value">{selectedHub.coordinates[1].toFixed(4)} / {selectedHub.coordinates[0].toFixed(4)}</span>

                                    <span className="label">ACTIVE_CONTRACTS:</span>
                                    <span className="value neon-text">{selectedHub.contracts}</span>
                                </div>

                                <button className="pt-button pt-intent-primary drill-btn mt-4">
                                    INITIATE DRILL-DOWN REGION
                                </button>
                            </div>
                        ) : (
                            <div className="pt-empty-state">
                                <span>AWAITING_TARGET_SELECTION...</span>
                                <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>Select a radar ping on the map to view regional intelligence.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
