"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { Code2, Play } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const QueryNode = ({ data, id, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const update = useCallback(
    (key: string, value: string) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, [key]: value } } : n))
      );
    },
    [id, setNodes]
  );

  return (
    <NodeWrapper
      title="SQL Запрос"
      icon={Code2}
      accentColor="border-purple-500"
      selected={selected}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Название</Label>
          <Input
            placeholder="Мой запрос"
            value={(data.queryName as string) || ''}
            onChange={(e) => update('queryName', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">SQL</Label>
          <textarea
            value={(data.sql as string) || ''}
            onChange={(e) => update('sql', e.target.value)}
            placeholder={'SELECT *\nFROM table\nLIMIT 100'}
            rows={5}
            className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2.5 py-2 text-sm text-foreground font-mono resize-y focus:outline-none focus:border-purple-500 leading-relaxed"
          />
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-xs font-medium transition-colors"
          onClick={() => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, status: 'running' } } : n
              )
            );
          }}
        >
          <Play size={11} />
          Выполнить
        </button>

        {data.status === 'running' && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[11px] text-yellow-400">Выполняется…</span>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};

export default QueryNode;
