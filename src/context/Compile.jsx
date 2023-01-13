import React, { createContext, useContext, useState } from 'react';

export const CompileContext = createContext();

export function CompileContextProvider({ children }) {
  const [compiledCode, setCompiledCode] = useState([]);
  const [variablesTable, setVariablesTable] = useState([]);
  const [syntaxErrors, setSyntaxErrors] = useState([]);
  const [semanticErrors, setSemanticErrors] = useState([]);

  function updateCompiledCode(data) {
    setCompiledCode(data)
  }

  function updateVariablesTable(data) {
    setVariablesTable([...variablesTable, ...data])
  }

  function updateSyntaxErrors(data) {
    setSyntaxErrors([...syntaxErrors, ...data])
  }

  function updateSemanticErrors(data) {
    setSemanticErrors([...semanticErrors, ...data])
  }

  return (
    <CompileContext.Provider value={{
      compiledCode,
      updateCompiledCode,
      variablesTable,
      updateVariablesTable,
      syntaxErrors,
      updateSyntaxErrors,
      semanticErrors, 
      updateSemanticErrors
    }}>
      {children}
    </CompileContext.Provider>
  );
}

export function useCompile() {
  return useContext(CompileContext);
}