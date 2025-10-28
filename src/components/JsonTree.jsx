import React from 'react'
import "../App.css"
import 'reactflow/dist/style.css';

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Position,
  } from 'reactflow';

const JsonTree = ({incomingNodes, incomingEdges}) => {

  return (
    <div className='jsonTreeMainDiv'>
        <ReactFlow nodes={incomingNodes} edges={incomingEdges}/>
    </div>
  )
}

export default JsonTree