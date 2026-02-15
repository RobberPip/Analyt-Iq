"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Controls,
    MiniMap,
    Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from 'next-themes';
import { CustomTriggerSideBar, SidebarNodes } from './ui/sidebar';
import { initialEdges, initialNodes } from './model';
import { reactFlowHandlers } from '@/app/hooks/reactFlowHandlers';
import { SidebarProvider } from '@/components/ui/sidebar';
import InputNode from '@/components/ui/InputNode';
import { NodeWrapper } from '@/components/ui/CustomNode';
const nodeTypes = {
  InputNode: InputNode,  // ← название должно совпадать с type в initialNodes
  custom: NodeWrapper,    // ← для ноды с type: 'custom'
};
function Page() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { theme, systemTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = React.useState(false)
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDragStart,
        onDragOver,
        onDrop,
    } = reactFlowHandlers(initialNodes, initialEdges);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (!isMounted) return null;

    return (
        <div
            ref={reactFlowWrapper}
            className="flex flex-auto relative"
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                onDrop={onDrop}
                onDragOver={onDragOver}
                colorMode={currentTheme === 'dark' ? 'dark' : 'light'}
                className="w-full h-full"
            >
                <Controls />
                <MiniMap />
                <Background variant={"dots" as any} gap={12} size={1} />
            </ReactFlow>
            <aside>
                <SidebarProvider open={open} style={{ ['--sidebar-width' as any]: '480px' }} onOpenChange={setOpen}>
                    <SidebarNodes onDragStart={onDragStart} />
                    <CustomTriggerSideBar />
                </SidebarProvider>
            </aside>
        </div>
    );
}

export default function WorkspacePage() {
    return (
        <ReactFlowProvider>
            <Page />
        </ReactFlowProvider>
    );
}
