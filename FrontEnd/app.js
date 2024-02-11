import React from "react"
import  ReactDOM  from "react-dom/client"

const Body=()=>{
  return (<div> Up and running !!</div>)
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<Body/>)