import React,{useState} from 'react'
import treeConverter from '../utils/treeConverter';
import jsonValidator from '../utils/jsonValidator';

const useJsonParser = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState(null);

  const parseAndConvert = () => {
    try{
        const parsed = jsonValidator({jsonString : jsonInput});
        const {nodes, edges} = treeConverter(parsed);
        setNodes(nodes);
        setEdges(edges);
        setError(null);
    }
    catch (error){
        setError(error);
    }
  }

  return  {
    jsonInput,
    setJsonInput,
    nodes,
    edges,
    error,
    parseAndConvert
  };
}

export default useJsonParser