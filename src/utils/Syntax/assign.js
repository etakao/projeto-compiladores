import { addVariableData } from "../Functions/addVariableData";
import { assigns } from "../Semantic/assigns";
import { expression } from "./expression";

export function assign(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable){
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
  
  assigns(firstPosition, lastPosition, compiledCode, variablesTable, semanticErrors);
  
  let {expressionLastPosition, expressionValue} = expression(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable);
  lastPosition = expressionLastPosition;

  if (compiledCode[lastPosition].token !== "SEMICOLON") {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM PONTO E VÍRGULA",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });

    return lastPosition;
  }

  addVariableData(firstPosition, compiledCode, expressionValue, variablesTable);

  lastPosition++;
  console.log("logAssign", compiledCode[lastPosition].token, compiledCode[lastPosition].line);
  return lastPosition;
}