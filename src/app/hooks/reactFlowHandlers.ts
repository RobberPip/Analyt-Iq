import React, { useState, useCallback } from 'react';
import {
    Node,
    NodeChange,
    EdgeChange,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    useReactFlow,
} from '@xyflow/react';

// Mapping from sidebar drag label → React Flow node type
const NODE_T    YPE_MAP: Record<string, string> = {
    InputNode: 'InputNode',
    DatabaseNode: 'DatabaseNode',
    QueryNode: 'QueryNode',
    FilterNode: 'FilterNode',
    OutputNode: 'OutputNode',
    GoogleDriveNode: 'GoogleDriveNode',
    TelegramNode: 'TelegramNode',
    WildberriesNode: 'WildberriesNode',
};

export function reactFlowHandlers(initialNodes: Node[], initialEdges: any[]) {
    const { screenToFlowPosition } = useReactFlow();
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [dragType, setDragType] = useState<string | null>(null);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
        setDragType(nodeType);
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!dragType) return;

            const resolvedType = NODE_TYPE_MAP[dragType];
            if (!resolvedType) return;

            const position = screenToFlowPosition({
                x: event.clientX - 128,
                y: event.clientY - 40,
            });

            const newNode: Node = {
                id: `${resolvedType}_${crypto.randomUUID()}`,
                type: resolvedType,
                position,
                data: {},
            };

            setNodes((nds) => [...nds, newNode]);
            setDragType(null);
        },
        [dragType, screenToFlowPosition]
    );

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDragStart,
        onDragOver,
        onDrop,
    };
}
