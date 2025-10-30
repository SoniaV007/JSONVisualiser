import React, { useEffect, useRef } from 'react'
import "../App.css"
import 'reactflow/dist/style.css';

import ReactFlow, {
    Controls,
    Background,
    ReactFlowProvider,
    useReactFlow,
  } from 'reactflow';

const JsonTreeContent = ({nodes, edges, matchedNode}) => {
  const reactFlowInstance = useReactFlow();
  const prevMatchedNode = useRef(null);

  useEffect(() => {
    if(matchedNode && matchedNode !== prevMatchedNode.current) {
      const node = nodes.find(n => n.id === matchedNode.nodeId);
      if(node && reactFlowInstance) {
        reactFlowInstance.setCenter(
          node.position.x + 100,
          node.position.y + 40,
          { zoom: 1, duration: 800 }
        );
      }
      prevMatchedNode.current = matchedNode;
    }
  }, [matchedNode, nodes, reactFlowInstance]);

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}

const JsonTree = ({nodes, edges, matchedNode}) => {
  return (
    <div className='jsonTreeMainDiv'>
      <ReactFlowProvider>
        <JsonTreeContent nodes={nodes} edges={edges} matchedNode={matchedNode} />
      </ReactFlowProvider>
    </div>
  )
}

export default JsonTree