import './App.css'
import JsonForm from './components/JsonForm'
import JsonTree from './components/JsonTree'

const nodes= [
  {
      id : "1",
      data : {
          label : "Node 1"
      },
      position :{ x: 200, y: 200}

  },
  {
      id : "2",
      data : {
          label : "Node 1"
      },
      position :{ x: 300, y: 300}

  }
];

function App() {

  return (
    <>
    <div className="mainDiv">
    <JsonForm />
    <JsonTree incomingNodes={nodes}/>
    </div>
    </>
  )
}

export default App
