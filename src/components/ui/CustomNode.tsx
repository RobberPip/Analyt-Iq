"use client";

import { Handle, Position } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';

interface NodeWrapperProps {
  selected?: boolean;
  children: React.ReactNode;
  title?: string;
  icon?: LucideIcon;
  accentColor?: string;
  hasTarget?: boolean;
  hasSource?: boolean;
}

export const NodeWrapper = ({
  selected,
  children,
  title = "Нода",
  icon: Icon,
  accentColor = 'border-purple-500',
  hasTarget = true,
  hasSource = true,
}: NodeWrapperProps) => {
  return (
    <div
      className={[
        'min-w-[256px] bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl',
        'border-l-[3px]',
        accentColor,
        selected ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-[#111]' : '',
        'transition-shadow duration-150',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#2a2a2a]">
        {Icon && (
          <div className="flex items-center justify-center w-5 h-5 text-muted-foreground">
            <Icon size={14} />
          </div>
        )}
        <span className="text-sm font-semibold text-foreground tracking-tight">{title}</span>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2.5">
        {children}
      </div>

      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3! h-3! bg-[#444]! border-2! border-[#666]! hover:bg-blue-400! transition-colors"
        />
      )}
      {hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3! h-3! bg-[#444]! border-2! border-[#666]! hover:bg-blue-400! transition-colors"
        />
      )}
    </div>
  );
};
