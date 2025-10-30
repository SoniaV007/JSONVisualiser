import {useState} from 'react'
import treeConverter from '../utils/treeConverter';
import jsonValidator from '../utils/jsonValidator';

const useJsonParser = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [searchPath, setSearchPath] = useState(null);
  const [matchedNode, setMatchedNode] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [theme, setTheme] = useState('dark');

  const parseAndConvert = () => {
    try{
        const parsed = jsonValidator({jsonString : jsonInput});
        setParsedData(parsed);
        const result = treeConverter(parsed, searchPath);
        setNodes(result.nodes);
        setEdges(result.edges);
        setMatchedNode(result.matchedNode);
        setError(null);
    }
    catch (err){
        setError(err.message);
    }
  }

  const handleSearch = (path) => {
    if(!parsedData) {
      setSearchMessage('Please visualize JSON first before searching');
      setMatchedNode(null);
      return;
    }

    setSearchPath(path);
    const result = treeConverter(parsedData, path);
    setNodes(result.nodes);
    setEdges(result.edges);
    setMatchedNode(result.matchedNode);

    if(result.matchedNode) {
      setSearchMessage('Match found');
      setTimeout(() => setSearchMessage(''), 2000);
    } else {
      setSearchMessage('No match found');
    }
  }

  const clearAll = () => {
    setJsonInput('');
    setNodes([]);
    setEdges([]);
    setParsedData(null);
    setSearchPath(null);
    setMatchedNode(null);
    setSearchMessage('');
    setError(null);
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  return  {
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
  };
}

export default useJsonParser