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
import DatabaseNode from '@/components/ui/DatabaseNode';
import QueryNode from '@/components/ui/QueryNode';
import FilterNode from '@/components/ui/FilterNode';
import OutputNode from '@/components/ui/OutputNode';
import GoogleDriveNode from '@/components/ui/GoogleDriveNode';
import TelegramNode from '@/components/ui/TelegramNode';
import WildberriesNode from '@/components/ui/WildberriesNode';

const nodeTypes = {
    InputNode,
    DatabaseNode,
    QueryNode,
    FilterNode,
    OutputNode,
    GoogleDriveNode,
    TelegramNode,
    WildberriesNode,
};

function Page() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { theme, systemTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = React.useState(false);

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
        <div ref={reactFlowWrapper} className="flex flex-auto relative">
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
                deleteKeyCode="Delete"
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} />
                <Background variant={"dots" as any} gap={16} size={1} />
            </ReactFlow>
            <aside>
                <SidebarProvider
                    open={open}
                    style={{ ['--sidebar-width' as any]: '260px' }}
                    onOpenChange={setOpen}
                >
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
