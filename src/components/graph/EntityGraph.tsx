import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './EntityGraph.css';

const initialNodes = [
    { id: '1', position: { x: 400, y: 100 }, data: { label: 'Ministerstvo Dopravy SR' }, type: 'input' },
    { id: '2', position: { x: 200, y: 300 }, data: { label: 'Stavba a Cesty a.s.' } },
    { id: '3', position: { x: 600, y: 300 }, data: { label: 'Národná diaľničná spoločnosť' } },
    { id: '4', position: { x: 200, y: 500 }, data: { label: 'Ing. Jozef Mak (Štatutár)' }, type: 'output' },
    { id: '5', position: { x: 400, y: 400 }, data: { label: 'Zmluva: CRZ-2023-002 (8.4M €)' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'Verejné obstarávanie' },
    { id: 'e1-3', source: '1', target: '3', label: 'Zriaďovateľ' },
    { id: 'e2-4', source: '2', target: '4', label: 'Personálne prepojenie', animated: true },
    { id: 'e1-5', source: '1', target: '5', label: 'Objednávateľ' },
    { id: 'e2-5', source: '2', target: '5', label: 'Dodávateľ' },
];

export const EntityGraph: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="pt-intel-graph-container" data-testid="entity-graph-container">
            <div className="pt-graph-toolbar">
                <h3 className="pt-graph-title">Network Analysis: Entity Linkages</h3>
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
