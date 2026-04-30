"use client";

import { NodeProps } from '@xyflow/react';
import { TableProperties } from 'lucide-react';
import { NodeWrapper } from './CustomNode';

const OutputNode = ({ data, selected }: NodeProps) => {
  const rows = data.result as Record<string, unknown>[] | undefined;

  return (
    <NodeWrapper
      title="Результат"
      icon={TableProperties}
      accentColor="border-green-500"
      selected={selected}
      hasSource={false}
    >
      <div className="nodrag flex flex-col gap-2 min-w-[320px]">
        {!rows || rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1.5 py-6 text-center">
            <TableProperties size={24} className="text-[#444]" />
            <p className="text-xs text-muted-foreground">
              Подключите ноду запроса<br />и нажмите «Выполнить»
            </p>
          </div>
        ) : (
          <div className="overflow-auto max-h-48 rounded-md border border-[#3a3a3a]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#3a3a3a] bg-[#252525]">
                  {Object.keys(rows[0]).map((col) => (
                    <th
                      key={col}
                      className="px-2 py-1.5 text-left font-medium text-muted-foreground whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#2a2a2a] hover:bg-[#252525] transition-colors"
                  >
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        className="px-2 py-1 text-foreground font-mono whitespace-nowrap"
                      >
                        {String(val ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rows && rows.length > 0 && (
          <p className="text-[11px] text-muted-foreground text-right">
            {rows.length} строк
          </p>
        )}
      </div>
    </NodeWrapper>
  );
};

export default OutputNode;
