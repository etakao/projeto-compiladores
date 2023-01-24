import { assigns } from "../Semantic/assigns";
import { expression } from "./expression";

export function assign(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors){
  let lastPosition = firstPosition + 1;
  
  if (compiledCode[lastPosition].token !== "ASSIGN") {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM ATRIBUIR",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }
  
  lastPosition++;
  
  assigns(compiledCode[firstPosition], compiledCode[lastPosition], variablesTable, semanticErrors);
  lastPosition = expression(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);
  
  console.log(compiledCode[lastPosition].token, compiledCode[lastPosition].column);
  return lastPosition;
}