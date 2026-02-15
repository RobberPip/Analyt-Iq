import { Node } from "@xyflow/react";

export const initialNodes: Node[] = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'InputNode', },
    { id: 'n2', position: { x: 300, y: 0 }, data: { label: 'Node 2' }, type: 'custom', },
];
export const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];