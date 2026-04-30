"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { Database } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const DB_TYPES = ['ClickHouse', 'PostgreSQL', 'MySQL', 'SQLite'];

const DatabaseNode = ({ data, id, selected }: NodeProps) => {
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
      title="База данных"
      icon={Database}
      accentColor="border-blue-500"
      selected={selected}
      hasTarget={false}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Тип</Label>
          <select
            value={(data.dbType as string) || 'ClickHouse'}
            onChange={(e) => update('dbType', e.target.value)}
            className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-blue-500"
          >
            {DB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Хост</Label>
            <Input
              placeholder="localhost"
              value={(data.host as string) || ''}
              onChange={(e) => update('host', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Порт</Label>
            <Input
              placeholder="8123"
              value={(data.port as string) || ''}
              onChange={(e) => update('port', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">База данных</Label>
          <Input
            placeholder="default"
            value={(data.database as string) || ''}
            onChange={(e) => update('database', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Пользователь</Label>
            <Input
              placeholder="default"
              value={(data.username as string) || ''}
              onChange={(e) => update('username', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Пароль</Label>
            <Input
              type="password"
              placeholder="••••••"
              value={(data.password as string) || ''}
              onChange={(e) => update('password', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#444]" />
          <span className="text-[11px] text-muted-foreground">Не подключено</span>
        </div>
      </div>
    </NodeWrapper>
  );
};

export default DatabaseNode;
