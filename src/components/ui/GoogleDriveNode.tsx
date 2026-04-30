"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { FolderOpen } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const FILE_FORMATS = ['CSV', 'XLSX', 'JSON', 'Parquet'];

const GoogleDriveNode = ({ data, id, selected }: NodeProps) => {
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
      title="Google Drive"
      icon={FolderOpen}
      accentColor="border-yellow-500"
      selected={selected}
      hasTarget={false}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Service Account JSON</Label>
          <Input
            placeholder="credentials.json path или Base64"
            value={(data.credentials as string) || ''}
            onChange={(e) => update('credentials', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-yellow-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Spreadsheet ID / File ID</Label>
          <Input
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
            value={(data.fileId as string) || ''}
            onChange={(e) => update('fileId', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Лист</Label>
            <Input
              placeholder="Sheet1"
              value={(data.sheet as string) || ''}
              onChange={(e) => update('sheet', e.target.value)}
              className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-yellow-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Формат</Label>
            <select
              value={(data.format as string) || 'CSV'}
              onChange={(e) => update('format', e.target.value)}
              className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-yellow-500"
            >
              {FILE_FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Диапазон (опционально)</Label>
          <Input
            placeholder="A1:Z1000"
            value={(data.range as string) || ''}
            onChange={(e) => update('range', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-yellow-500"
          />
        </div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#444]" />
          <span className="text-[11px] text-muted-foreground">Не подключено</span>
        </div>
      </div>
    </NodeWrapper>
  );
};

export default GoogleDriveNode;
