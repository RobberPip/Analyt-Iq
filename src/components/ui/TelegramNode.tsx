"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { Send } from 'lucide-react';
import { useCallback } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

const SEND_MODES = ['Сообщение', 'Файл', 'Таблица (CSV)', 'Фото'];

const TelegramNode = ({ data, id, selected }: NodeProps) => {
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
      title="Telegram"
      icon={Send}
      accentColor="border-sky-400"
      selected={selected}
      hasSource={false}
    >
      <div className="nodrag flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Bot Token</Label>
          <Input
            type="password"
            placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
            value={(data.botToken as string) || ''}
            onChange={(e) => update('botToken', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-sky-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Chat ID</Label>
          <Input
            placeholder="-1001234567890 или @username"
            value={(data.chatId as string) || ''}
            onChange={(e) => update('chatId', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-sky-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Режим отправки</Label>
          <select
            value={(data.mode as string) || 'Сообщение'}
            onChange={(e) => update('mode', e.target.value)}
            className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-sky-400"
          >
            {SEND_MODES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Шаблон сообщения</Label>
          <textarea
            value={(data.template as string) || ''}
            onChange={(e) => update('template', e.target.value)}
            placeholder={'📊 Отчёт за {{date}}\nСтрок: {{rows}}'}
            rows={3}
            className="w-full bg-[#252525] border border-[#3a3a3a] rounded-md px-2.5 py-2 text-sm text-foreground resize-y focus:outline-none focus:border-sky-400 leading-relaxed"
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

export default TelegramNode;
