import { analyzer } from "./analyzer";

export function begin(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  if (lastPosition >= compiledCode.length) {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition-1].token,
      error: "DEVERIA SER UM END",
      line: compiledCode[lastPosition-1].line,
      column: compiledCode[lastPosition-1].column,
    });
    
    setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  } else {
    while (compiledCode[lastPosition].token !== 'END' && lastPosition < compiledCode.length ) {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
      lastPosition++;
    }

    if (compiledCode[lastPosition].token !== 'END'){
      newSyntaxErrors.push({ 
        token: compiledCode[lastPosition-1].token,
        error: "DEVERIA SER UM END",
        line: compiledCode[lastPosition-1].line,
        column: compiledCode[lastPosition-1].column,
      });
    
      setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
    }
  }

  return lastPosition;
}