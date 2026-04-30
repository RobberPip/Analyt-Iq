"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { Type } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const InputNode = ({ data, id, selected }: NodeProps) => {
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
      title="Ввод"
      icon={Type}
      accentColor="border-sky-500"
      selected={selected}
      hasTarget={false}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Параметр</Label>
          <Input
            placeholder="Название параметра"
            value={(data.label as string) || ''}
            onChange={(e) => update('label', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-sky-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Значение</Label>
          <Input
            placeholder="Введите значение…"
            value={(data.inputValue as string) || ''}
            onChange={(e) => update('inputValue', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-sky-500"
          />
        </div>
      </div>
    </NodeWrapper>
  );
};

export default InputNode;
