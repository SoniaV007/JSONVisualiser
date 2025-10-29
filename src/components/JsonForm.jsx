import React from 'react'
import "../App.css"

const JsonForm = ({jsonInput,setJsonInput,convertJsonAsNodesAndEdges}) => {

  return (
    <div className='jsonFormDiv'>
        <label>
            Paste JSON to visualise in tree form
        <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}/>
        </label>
        <button onClick={() => convertJsonAsNodesAndEdges()}> Visualise JSON</button>
    </div>
  )
}

export default JsonForm