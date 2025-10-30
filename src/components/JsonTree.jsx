import React, { useEffect, useRef } from 'react'
import "../App.css"
import 'reactflow/dist/style.css';

import ReactFlow, {
    Controls,
    Background,
    ReactFlowProvider,
    useReactFlow,
    getNodesBounds,
    getViewportForBounds,
  } from 'reactflow';
import { toPng } from 'html-to-image';

import CustomNode from './CustomNode';

const nodeTypes = {
  default: CustomNode,
};

const JsonTreeContent = ({nodes, edges, matchedNode, onDownloadReady}) => {
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

  useEffect(() => {
    if(reactFlowInstance && onDownloadReady && nodes.length > 0) {
      onDownloadReady(() => downloadImage(reactFlowInstance, nodes));
    }
  }, [reactFlowInstance, nodes]);

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}

function downloadImage(reactFlowInstance, nodes) {
  const nodesBounds = getNodesBounds(nodes);
  const imageWidth = nodesBounds.width + 400;
  const imageHeight = nodesBounds.height + 400;

  const viewport = getViewportForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5,
    2,
    0.2
  );

  const viewportElement = document.querySelector('.react-flow__viewport');

  toPng(viewportElement, {
    backgroundColor: '#0f172a',
    width: imageWidth,
    height: imageHeight,
    style: {
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    },
    pixelRatio: 2,
  }).then((dataUrl) => {
    const a = document.createElement('a');
    a.setAttribute('download', 'json-tree.png');
    a.setAttribute('href', dataUrl);
    a.click();
  });
}

const JsonTree = ({nodes, edges, matchedNode, onDownloadReady}) => {
  return (
    <div className='jsonTreeMainDiv'>
      <ReactFlowProvider>
        <JsonTreeContent
          nodes={nodes}
          edges={edges}
          matchedNode={matchedNode}
          onDownloadReady={onDownloadReady}
        />
      </ReactFlowProvider>
    </div>
  )
}

export default JsonTree