import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(data.path).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1500);
    });
  };

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <strong>Path:</strong> {data.path}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.7, flexShrink: 0, cursor: 'pointer' }}
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </div>
          <div><strong>Type:</strong> {data.nodeType}</div>
        </div>
      )}

      {showCopied && (
        <div className="copied-message">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CustomNode;
