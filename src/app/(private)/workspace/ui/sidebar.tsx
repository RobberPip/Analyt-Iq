"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useState } from "react";
import { Database, Type, Code2, ListFilter, TableProperties, FolderOpen, Send, ShoppingBag } from "lucide-react";
import { LucideIcon } from "lucide-react";

type NodeDef = {
    type: string;
    label: string;
    description: string;
    icon: LucideIcon;
    accent: string;
    iconBg: string;
};

const NODE_GROUPS: { title: string; nodes: NodeDef[] }[] = [
    {
        title: "Источники",
        nodes: [
            {
                type: "DatabaseNode",
                label: "База данных",
                description: "ClickHouse, PG, MySQL",
                icon: Database,
                accent: "border-blue-500",
                iconBg: "bg-blue-500/10 text-blue-400",
            },
            {
                type: "InputNode",
                label: "Ввод параметра",
                description: "Текстовый параметр",
                icon: Type,
                accent: "border-sky-500",
                iconBg: "bg-sky-500/10 text-sky-400",
            },
        ],
    },
    {
        title: "Трансформации",
        nodes: [
            {
                type: "QueryNode",
                label: "SQL Запрос",
                description: "Выполнить SQL",
                icon: Code2,
                accent: "border-purple-500",
                iconBg: "bg-purple-500/10 text-purple-400",
            },
            {
                type: "FilterNode",
                label: "Фильтр",
                description: "WHERE условие",
                icon: ListFilter,
                accent: "border-amber-500",
                iconBg: "bg-amber-500/10 text-amber-400",
            },
        ],
    },
    {
        title: "Вывод",
        nodes: [
            {
                type: "OutputNode",
                label: "Результат",
                description: "Таблица данных",
                icon: TableProperties,
                accent: "border-green-500",
                iconBg: "bg-green-500/10 text-green-400",
            },
            {
                type: "TelegramNode",
                label: "Telegram",
                description: "Отправить сообщение / файл",
                icon: Send,
                accent: "border-sky-400",
                iconBg: "bg-sky-400/10 text-sky-400",
            },
        ],
    },
    {
        title: "Интеграции",
        nodes: [
            {
                type: "GoogleDriveNode",
                label: "Google Drive",
                description: "Sheets, CSV, XLSX",
                icon: FolderOpen,
                accent: "border-yellow-500",
                iconBg: "bg-yellow-500/10 text-yellow-400",
            },
            {
                type: "WildberriesNode",
                label: "Wildberries",
                description: "Карточка товара по артикулу",
                icon: ShoppingBag,
                accent: "border-violet-500",
                iconBg: "bg-violet-500/10 text-violet-400",
            },
        ],
    },
];

type SidebarNodesProps = {
    onDragStart: (e: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
};

export function SidebarNodes({ onDragStart }: SidebarNodesProps) {
    return (
        <Sidebar side="right" className="mt-14 overflow-y-auto border-l border-[#2a2a2a]">
            <SidebarContent className="gap-0 px-2 py-3">
                {NODE_GROUPS.map((group) => (
                    <SidebarGroup key={group.title} className="px-0 py-2">
                        <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-1.5">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1.5">
                                {group.nodes.map((node) => (
                                    <NodeCard
                                        key={node.type}
                                        node={node}
                                        onDragStart={onDragStart}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}

function NodeCard({
    node,
    onDragStart,
}: {
    node: NodeDef;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}) {
    const Icon = node.icon;

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            className={[
                "flex items-center gap-3 px-2.5 py-2.5 rounded-lg cursor-grab active:cursor-grabbing",
                "bg-[#1a1a1a] border border-[#2a2a2a]",
                `border-l-2 ${node.accent}`,
                "hover:bg-[#222] hover:border-[#3a3a3a] transition-colors",
                "select-none",
            ].join(" ")}
        >
            <div className={`flex items-center justify-center w-8 h-8 rounded-md shrink-0 ${node.iconBg}`}>
                <Icon size={15} />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-foreground leading-tight">{node.label}</span>
                <span className="text-[11px] text-muted-foreground leading-tight truncate">{node.description}</span>
            </div>
        </div>
    );
}

export function CustomTriggerSideBar() {
    const { toggleSidebar } = useSidebar();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarTriggerClass = isSidebarOpen
        ? "right-[270px] transition-[right] duration-300 ease-in-out"
        : "right-[10px] transition-[right] duration-300 ease-in-out";

    return (
        <button
            onClick={() => {
                toggleSidebar();
                setIsSidebarOpen(!isSidebarOpen);
            }}
            aria-label="Toggle Sidebar"
            className={`
                absolute top-1/2 cursor-pointer -translate-y-1/2
                w-10 h-10 flex items-center justify-center
                rounded-lg bg-[#1e1e1e] border border-[#333]
                hover:bg-[#2a2a2a] hover:border-[#444]
                transition-colors
                ${sidebarTriggerClass}
            `}
        >
            <Image
                src="/icons/integrations.svg"
                alt="integrations"
                width={20}
                height={20}
            />
        </button>
    );
}
