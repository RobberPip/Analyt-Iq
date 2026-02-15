import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui

interface NodeWrapperProps extends NodeProps {
  children: React.ReactNode;
  title?: string;
}

export const NodeWrapper = ({ data, selected, children, title = "Нода" }: NodeWrapperProps) => {
  return (
    <Card className="w-48 h-52 hover:scale-[1.02] px-1 pb-1 pt-3 flex flex-col gap-3 backdrop-opacity-10 rounded-lg">
      <CardTitle className='ml-2'>
        Нода
      </CardTitle>
      
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right}/>
      <div className="w-full h-full bg-[#2d2d2d] rounded-lg border border-[#404040]">
        {children}
      </div>
    </Card>
  );
};
