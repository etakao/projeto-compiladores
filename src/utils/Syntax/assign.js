import { expression } from "./expression";

export function assign(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  if (compiledCode[lastPosition].token !== "COLON") {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM DOIS PONTOS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  if (compiledCode[lastPosition].token !== "EQUAL") {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IGUAL",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  lastPosition = expression(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
  
  console.log(compiledCode[lastPosition].token, compiledCode[lastPosition].column);
  return lastPosition;
}