import React from 'react'

const ErrorDisplay = ({message}) => {
  return (
    <div className="error-display">
      <strong>Error:</strong> {message}
    </div>
  )
}

export default ErrorDisplay