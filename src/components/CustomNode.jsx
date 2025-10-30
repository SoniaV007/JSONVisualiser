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
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflow: 'hidden'
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: 'hidden' }}
      />
      <div style={{
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
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
