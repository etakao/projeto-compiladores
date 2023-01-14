import { analyzer } from "./analyzer";

export function looping(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  if (compiledCode[lastPosition].token !== 'OPEN_PARENTHESIS') {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM ABRE PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
  
  if(compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'){
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM FECHA PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 

  lastPosition++;

  if(compiledCode[lastPosition].token !== 'DO'){
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM DO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);

  return (lastPosition);
}