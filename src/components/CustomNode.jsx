import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: 'relative' }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />

      {showTooltip && (
        <div className="node-tooltip">
          <div><strong>Path:</strong> {data.path}</div>
          <div><strong>Type:</strong> {data.nodeType}</div>
        </div>
      )}
    </div>
  );
};

export default CustomNode;
