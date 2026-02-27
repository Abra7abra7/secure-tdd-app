import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    type Node,
    type Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './EntityGraph.css';
import { useContracts } from '../../api/useContracts';

export const EntityGraph: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { data: contracts, isLoading } = useContracts();

    // Map contracts to graph nodes/edges
    useEffect(() => {
        if (!contracts || contracts.length === 0) return;

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        // Root Node
        newNodes.push({
            id: 'root',
            position: { x: 400, y: 50 },
            data: { label: 'SK (Slovenská Republika)' },
            type: 'input'
        });

        // Track unique categories to avoid duplicates
        const categories = Array.from(new Set(contracts.map(c => c.category)));
        categories.forEach((cat, idx) => {
            const catId = `cat-${idx}`;
            newNodes.push({
                id: catId,
                position: { x: 200 + idx * 400, y: 200 },
                data: { label: cat }
            });
            newEdges.push({
                id: `edge-root-${catId}`,
                source: 'root',
                target: catId,
                label: 'Odvetvie',
                animated: true
            });
        });

        // Add subjects (suppliers)
        contracts.forEach((contract, i) => {
            // Limit mapping to 10 entities to prevent massive graph clutter
            if (i >= 15) return;

            const suppId = `supp-${i}`;
            const catId = `cat-${categories.indexOf(contract.category)}`;

            newNodes.push({
                id: suppId,
                position: { x: (i % 5) * 200, y: 400 + Math.floor(i / 5) * 100 },
                data: { label: contract.supplier },
                type: 'output'
            });

            newEdges.push({
                id: `edge-${catId}-${suppId}`,
                source: catId,
                target: suppId,
                label: `Zmluva: ${contract.id}`
            });
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [contracts, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="pt-intel-graph-container" data-testid="entity-graph-container">
            <div className="pt-graph-toolbar">
                <h3 className="pt-graph-title">Network Analysis: Real-time Ontology {isLoading && <span className="pt-live-indicator" style={{ marginLeft: 10 }}>● LOADING DATA...</span>}</h3>
                <input
                    type="text"
                    className="pt-graph-search"
                    placeholder="Search entities, ICOs, contracts..."
                />
            </div>
            <div className="pt-graph-body">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    colorMode="dark"
                    proOptions={{ hideAttribution: true }}
                >
                    <Controls />
                    <MiniMap
                        nodeColor={(n: any) => {
                            if (n.type === 'input') return '#ffff00';
                            if (n.type === 'output') return '#ff0000';
                            return '#4caf50';
                        }}
                        maskColor="rgba(0, 0, 0, 0.7)"
                    />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#30404d" />
                </ReactFlow>
            </div>
        </div>
    );
};
