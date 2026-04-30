"use client";

import { NodeProps, useReactFlow } from '@xyflow/react';
import { ShoppingBag, Play } from 'lucide-react';
import { useCallback, useState } from 'react';
import { NodeWrapper } from './CustomNode';
import { Input } from './input';
import { Label } from './label';

type WbProduct = {
  id: number;
  name: string;
  brand: string;
  category: string;
  priceU: number;
  salePriceU: number;
  rating: number;
  feedbacks: number;
  url: string;
};

const WildberriesNode = ({ data, id, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [product, setProduct] = useState<WbProduct | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = useCallback(
    (key: string, value: string) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, [key]: value } } : n))
      );
    },
    [id, setNodes]
  );

  const handleRun = useCallback(async () => {
    const article = ((data.article as string) || '').trim();
    if (!article) return;

    setStatus('loading');
    setProduct(null);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/wb?article=${encodeURIComponent(article)}`);
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? `Ошибка ${res.status}`);
        setStatus('error');
        return;
      }

      const p: WbProduct = json;
      setProduct(p);
      setStatus('ok');

      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, result: [p] } } : n
        )
      );
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setStatus('error');
    }
  }, [data, id, setNodes]);

  const discount =
    product && product.priceU > 0
      ? Math.round(((product.priceU - product.salePriceU) / product.priceU) * 100)
      : 0;

  return (
    <NodeWrapper
      title="Wildberries"
      icon={ShoppingBag}
      accentColor="border-violet-500"
      selected={selected}
      hasTarget={false}
    >
      <div className="nodrag flex flex-col gap-2 min-w-[260px]">
        <div className="flex flex-col gap-1">
          <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Артикул товара
          </Label>
          <Input
            placeholder="например 275248394"
            value={(data.article as string) || ''}
            onChange={(e) => update('article', e.target.value)}
            className="h-8 text-sm bg-[#252525] border-[#3a3a3a] focus:border-violet-500"
          />
        </div>

        <button
          type="button"
          onClick={handleRun}
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 active:bg-violet-700 disabled:opacity-50 text-white text-xs font-medium transition-colors"
        >
          <Play size={11} />
          {status === 'loading' ? 'Загрузка…' : 'Получить данные'}
        </button>

        {/* Статус */}
        {status !== 'idle' && (
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'loading'
                  ? 'bg-yellow-400 animate-pulse'
                  : status === 'ok'
                  ? 'bg-green-400'
                  : 'bg-red-400'
              }`}
            />
            <span
              className={`text-[11px] ${
                status === 'loading'
                  ? 'text-yellow-400'
                  : status === 'ok'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {status === 'loading' ? 'Запрос…' : status === 'ok' ? 'Готово' : errorMsg}
            </span>
          </div>
        )}

        {/* Карточка товара */}
        {product && (
          <div className="flex flex-col gap-1.5 bg-[#111] border border-[#2a2a2a] rounded-lg p-2.5 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] text-violet-400 font-medium truncate">{product.brand}</span>
                <span className="text-foreground font-medium leading-snug line-clamp-2">{product.name}</span>
              </div>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[10px] text-violet-400 hover:underline whitespace-nowrap"
              >
                #{product.id}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-0.5">
              <div className="flex flex-col gap-0.5 bg-[#1a1a1a] rounded-md px-2 py-1.5">
                <span className="text-[10px] text-muted-foreground">Цена со скидкой</span>
                <span className="text-green-400 font-semibold">{product.salePriceU.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-[#1a1a1a] rounded-md px-2 py-1.5">
                <span className="text-[10px] text-muted-foreground">Без скидки</span>
                <span className="text-foreground line-through opacity-60">{product.priceU.toLocaleString('ru-RU')} ₽</span>
                {discount > 0 && (
                  <span className="text-red-400 text-[10px] font-medium">−{discount}%</span>
                )}
              </div>
              <div className="flex flex-col gap-0.5 bg-[#1a1a1a] rounded-md px-2 py-1.5">
                <span className="text-[10px] text-muted-foreground">Рейтинг</span>
                <span className="text-yellow-400 font-semibold">★ {product.rating}</span>
                <span className="text-[10px] text-muted-foreground">{product.feedbacks.toLocaleString('ru-RU')} отзывов</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-[#1a1a1a] rounded-md px-2 py-1.5">
                <span className="text-[10px] text-muted-foreground">Категория</span>
                <span className="text-foreground font-medium truncate">{product.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};

export default WildberriesNode;
