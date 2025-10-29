import React from 'react'
import "../App.css"
import 'reactflow/dist/style.css';

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Position,
  } from 'reactflow';

const JsonTree = ({nodes, edges}) => {

  return (
    <div className='jsonTreeMainDiv'>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
    </div>
  )
}

export default JsonTree