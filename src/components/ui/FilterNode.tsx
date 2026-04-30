"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { ListFilter } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'LIKE', 'IN', 'NOT IN', 'IS NULL', 'IS NOT NULL'];

const FilterNode = ({ data, id, selected }: NodeProps) => {
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
      title="Фильтр"
      icon={ListFilter}
      accentColor="border-amber-500"
      selected={selected}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Поле</Label>
          <Input
            placeholder="column_name"
            value={(data.field as string) || ''}
            onChange={(e) => update('field', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] font-mono focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Оператор</Label>
          <select
            value={(data.operator as string) || '='}
            onChange={(e) => update('operator', e.target.value)}
            className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-amber-500"
          >
            {OPERATORS.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>

        {!['IS NULL', 'IS NOT NULL'].includes((data.operator as string) || '=') && (
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Значение</Label>
            <Input
              placeholder="value"
              value={(data.value as string) || ''}
              onChange={(e) => update('value', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] font-mono focus:border-amber-500"
            />
          </div>
        )}

        <div className="bg-[#252525] border border-[#3a3a3a] rounded-md px-2 py-1.5 text-xs font-mono text-amber-400">
          WHERE {(data.field as string) || 'поле'} {(data.operator as string) || '='}{' '}
          {!['IS NULL', 'IS NOT NULL'].includes((data.operator as string) || '=')
            ? `'${(data.value as string) || 'значение'}'`
            : ''}
        </div>
      </div>
    </NodeWrapper>
  );
};

export default FilterNode;
