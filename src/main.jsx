import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CompileContextProvider } from './context/Compile'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <CompileContextProvider> */}
      <App />
    {/* </CompileContextProvider> */}
  </React.StrictMode>
)
