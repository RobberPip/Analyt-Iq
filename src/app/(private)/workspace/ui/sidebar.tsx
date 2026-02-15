import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import { useState } from "react";

type SidebarNodesProps = {
    onDragStart: (e: React.DragEvent<HTMLButtonElement>, nodeType: string) => void;
};

export function SidebarNodes({ onDragStart }: SidebarNodesProps) {
    return (
        <Sidebar side='right' className="mt-14 overflow-y-auto">
            <SidebarGroup>
                <SidebarGroupLabel>Интеграции</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuButton
                                draggable
                                onDragStart={(e) => onDragStart(e, 'Круг')}
                                style={{
                                    width: 230,
                                    backgroundColor: '#662c6bff',
                                    cursor: 'grab',
                                }}
                                title="Перетащите, чтобы добавить круг"
                            >Нода 1</SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroupContent>
            </SidebarGroup>
        </Sidebar>
    );
}

export function CustomTriggerSideBar() {
    const { toggleSidebar } = useSidebar();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarTriggerClass = isSidebarOpen
        ? 'right-[490px] transition-right duration-300 ease-in-out'
        : 'right-[10px] transition-right duration-300 ease-in-out';

    return (
        <button
            onClick={() => { toggleSidebar(); setIsSidebarOpen(!isSidebarOpen); }}
            aria-label="Toggle Sidebar"
            className={`
            absolute top-1/2  cursor-pointer  -translate-y-1/2
            w-12 h-12 flex justify-center
            rounded-lg bg-[rgb(45,45,45)]
            border-2
            hover:shadow-[0_0_0_4px_rgba(45,45,45)]
            ${sidebarTriggerClass}
      `}
        >
            <Image
                src="/icons/integrations.svg"
                alt="integrations"
                width={24}
                height={24}
            />
        </button>
    );
}