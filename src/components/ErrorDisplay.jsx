import React from 'react'

const ErrorDisplay = ({message, children}) => {
  return (
    <div className="error-display">
      <strong>Error:</strong> {message}
      {children}
    </div>
  )
}

export default ErrorDisplay