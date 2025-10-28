import React,{useState} from 'react'

const JsonForm = () => {
  const [jsonInput,setJsonInput] = useState(" ");
  return (
    <div>
        <label>
            Paste JSON to visualise in tree form
        <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}/>
        </label>
        <button>Visualise JSON</button>
    </div>
  )
}

export default JsonForm