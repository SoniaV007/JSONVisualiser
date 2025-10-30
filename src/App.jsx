import './App.css'
import JsonForm from './components/JsonForm'
import JsonTree from './components/JsonTree'
import ErrorDisplay from './components/ErrorDisplay'
import SearchBar from './components/SearchBar'
import React, { useEffect, useRef } from 'react'
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

  const downloadHandlerRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleDownload = () => {
    if(downloadHandlerRef.current && nodes.length > 0) {
      downloadHandlerRef.current();
    }
  };

  const setDownloadHandler = (handler) => {
    downloadHandlerRef.current = handler;
  };

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
        <SearchBar
          onSearch={handleSearch}
          theme={theme}
          toggleTheme={toggleTheme}
          onDownload={handleDownload}
        />
        <JsonTree
          nodes={nodes}
          edges={edges}
          matchedNode={matchedNode}
          onDownloadReady={setDownloadHandler}
        />
      </div>
    </div>
    </>
  )
}

export default App