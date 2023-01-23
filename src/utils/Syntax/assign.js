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
  } else {
    lastPosition++;
  }

  if (compiledCode[lastPosition].token !== "EQUAL") {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IGUAL",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } else {
    lastPosition++;
  }

  lastPosition = expression(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
  
  return lastPosition;
}