import React from 'react'
import "../App.css"

const JsonForm = ({jsonInput, setJsonInput, convertJsonAsNodesAndEdges, clearAll}) => {

  return (
    <div className='jsonFormDiv'>
        <label>
            Paste JSON to visualise in tree form
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste your JSON here...'
        />
        </label>
        <div className="button-group">
          <button onClick={() => convertJsonAsNodesAndEdges()}>Visualise JSON</button>
          <button className="clear-button" onClick={clearAll}>Clear</button>
        </div>
    </div>
  )
}

export default JsonForm