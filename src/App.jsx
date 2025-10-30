import './App.css'
import JsonForm from './components/JsonForm'
import JsonTree from './components/JsonTree'
import ErrorDisplay from './components/ErrorDisplay'
import SearchBar from './components/SearchBar'
import React from 'react'
import useJsonParser from './hooks/useJsonParser'

function App() {
  const {
    jsonInput,
    setJsonInput,
    nodes,
    edges,
    error,
    parseAndConvert,
    handleSearch,
    matchedNode,
    searchMessage
  } = useJsonParser();

  return (
    <>
    <div className="mainDiv">
      <JsonForm
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        convertJsonAsNodesAndEdges={parseAndConvert}
      />
      {error && <ErrorDisplay message={error} />}
      {searchMessage && (
        <div className={`search-message ${matchedNode ? 'success' : 'error'}`}>
          {searchMessage}
        </div>
      )}
      <div className="treeContainer">
        <SearchBar onSearch={handleSearch} />
        <JsonTree
          nodes={nodes}
          edges={edges}
          matchedNode={matchedNode}
        />
      </div>
    </div>
    </>
  )
}

export default App