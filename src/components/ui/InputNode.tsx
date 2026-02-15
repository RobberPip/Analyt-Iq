// InputNode.tsx
import { NodeProps } from '@xyflow/react';
import { Input } from '@/components/ui/input';
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { NodeWrapper } from './CustomNode';

const InputNode = ({ data, id }: NodeProps) => {
  const { setNodes } = useReactFlow();
  
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNodes(nds => 
      nds.map(node => 
        node.id === id 
          ? { ...node, data: { ...node.data, inputValue: e.target.value } }
          : node
      )
    );
  }, [id, setNodes]);

  return (
    <NodeWrapper title="Ввод" data={data}>
      <div className="flex flex-col gap-1 p-2">
        <Input
          value={data.inputValue || ''}  // ← было value={2} - фиксированное значение!
          onChange={onInputChange}
          placeholder="Введите текст..."
          className="w-full h-10 bg-white/10 border-[#404040] text-sm 
                     placeholder:text-muted-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </NodeWrapper>
  );
};

export default InputNode;
