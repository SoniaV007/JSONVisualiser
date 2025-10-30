import './App.css'
import JsonForm from './components/JsonForm'
import JsonTree from './components/JsonTree'
import ErrorDisplay from './components/ErrorDisplay'
import SearchBar from './components/SearchBar'
import React, { useEffect } from 'react'
import useJsonParser from './hooks/useJsonParser'

function App() {
  const {
    jsonInput,
    setJsonInput,
    nodes,
    edges,
    error,
    setError,
    parseAndConvert,
    handleSearch,
    matchedNode,
    searchMessage,
    setSearchMessage,
    clearAll,
    theme,
    toggleTheme
  } = useJsonParser();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
    <div className="mainDiv">
      <JsonForm
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        convertJsonAsNodesAndEdges={parseAndConvert}
        clearAll={clearAll}
      />
      {error && (
        <ErrorDisplay message={error}>
          <button className="close-btn" onClick={() => setError(null)}>×</button>
        </ErrorDisplay>
      )}
      {searchMessage && (
        <div className={`search-message ${matchedNode ? 'success' : 'error'}`}>
          {searchMessage}
          <button className="close-btn" onClick={() => setSearchMessage('')}>×</button>
        </div>
      )}
      <div className="treeContainer">
        <SearchBar onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
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