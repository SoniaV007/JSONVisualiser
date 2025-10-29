import './App.css'
import JsonForm from './components/JsonForm'
import JsonTree from './components/JsonTree'
import ErrorDisplay from './components/ErrorDisplay'
import React from 'react'
import useJsonParser from './hooks/useJsonParser'

function App() {
  const {jsonInput,setJsonInput, nodes, edges, error, parseAndConvert} = useJsonParser(); 

  return (
    <>
    <div className="mainDiv">
    <JsonForm jsonInput={jsonInput} setJsonInput={setJsonInput} convertJsonAsNodesAndEdges={parseAndConvert}/>
    {error && <ErrorDisplay message={error} />}
    <JsonTree nodes={nodes} edges={edges}/>
    </div>
    </>
  )
}

export default App