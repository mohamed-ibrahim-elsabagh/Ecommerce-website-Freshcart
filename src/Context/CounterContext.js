const { createContext, useState } = require("react");


export let CounterContext= createContext()

export default function CounterContextProvider(prpos){


  const [count, setCount] = useState(0)

  function changeCount(){
    setCount(Math.random())
  }




  return <>
  <CounterContext.Provider value={ {count ,changeCount } }>
    {prpos.children}
  </CounterContext.Provider>
  
  </>

}