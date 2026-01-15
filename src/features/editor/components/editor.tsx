"use client";
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge, NodeChange, EdgeChange, Connection, Background, MiniMap, Controls, Panel } from '@xyflow/react';
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import '@xyflow/react/dist/style.css';
import { nodeComponents } from '@/components/node-components';
import { AddNodeButton } from './add-node-button';
import { editorAtoms } from '../store/atoms';
import { useSetAtom } from 'jotai';

export const Editor = ({ workflowId }: { workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId);
    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);
    const setEditor = useSetAtom(editorAtoms)
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div className='w-full h-165'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeComponents}
                proOptions={{
                    hideAttribution: true
                }}
                snapGrid={[10,10]}
                snapToGrid
                selectionOnDrag
                panOnScroll
                panOnDrag={false}
                onInit={setEditor}
            >
                <Background />
                <MiniMap />
                <Controls />
                <Panel position="top-right">
                    <AddNodeButton/>
                </Panel>
            </ReactFlow>
        </div>
    );
}