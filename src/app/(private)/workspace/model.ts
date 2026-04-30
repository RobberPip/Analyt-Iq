import { Node } from "@xyflow/react";

export const initialNodes: Node[] = [
    {
        id: 'db1',
        position: { x: 60, y: 120 },
        type: 'DatabaseNode',
        data: { dbType: 'ClickHouse', host: 'localhost', port: '8123', database: 'default' },
    },
    {
        id: 'query1',
        position: { x: 380, y: 80 },
        type: 'QueryNode',
        data: { queryName: 'Все пользователи', sql: 'SELECT *\nFROM users\nLIMIT 100' },
    },
    {
        id: 'filter1',
        position: { x: 380, y: 320 },
        type: 'FilterNode',
        data: { field: 'status', operator: '=', value: 'active' },
    },
    {
        id: 'output1',
        position: { x: 700, y: 80 },
        type: 'OutputNode',
        data: {},
    },
];

export const initialEdges = [
    { id: 'e-db1-query1', source: 'db1', target: 'query1' },
    { id: 'e-query1-filter1', source: 'query1', target: 'filter1' },
    { id: 'e-filter1-output1', source: 'filter1', target: 'output1' },
];
