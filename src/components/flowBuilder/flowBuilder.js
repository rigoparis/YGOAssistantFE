import React, { useRef, useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { useSelector } from "react-redux";

import CardSelector from "./cardSelector";

import "reactflow/dist/style.css";

function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const { activeDeck } = useSelector((state) => state.deck);
  const [nodes, setNodes, onNodesChange] = useNodesState(activeDeck.flow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeDeck.flow.edges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const nodesRef = React.useRef(nodes);

  useEffect(() => {
    if (nodes) {
      nodesRef.current = nodes;
    }
  }, [nodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      console.log("onDrop", event, reactFlowWrapper);
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const cardId = event.dataTransfer.getData("cardId");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: cardId },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes],
  );

  return (
    <ReactFlowProvider>
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-160px)] mt-4">
        <div className="col-span-2 w-full h-full bg-neutral-content" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}>
            <MiniMap zoomable pannable />
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <CardSelector />
      </div>
    </ReactFlowProvider>
  );
}

FlowBuilder.propTypes = {};

export default FlowBuilder;
