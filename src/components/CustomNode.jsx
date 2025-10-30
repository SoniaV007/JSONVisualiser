import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: 'hidden' }}
      />
      <div>
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ visibility: 'hidden' }}
      />

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
