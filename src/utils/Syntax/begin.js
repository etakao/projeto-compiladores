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

    return compiledCode.length-1;
  } else {
    while (compiledCode[lastPosition].token !== 'END' && lastPosition < compiledCode.length ) {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
      lastPosition++;
    }

    if (lastPosition >= compiledCode.length) {
      newSyntaxErrors.push({ 
        token: compiledCode[compiledCode.length-1].token,
        error: "DEVERIA SER UM END",
        line: compiledCode[compiledCode.length-1].line,
        column: compiledCode[compiledCode.length-1].column,
      });
    
      setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);

      return compiledCode.length-1;
    } else {
      return lastPosition;
    }
  }
}