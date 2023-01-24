import { checkExpressionType } from "../Functions/checkExpressionType";

export function expressions(index, compiledCode, variablesTable, semanticErrors) {
  let expressionTypeCompatibility = checkExpressionType(index, compiledCode, variablesTable);
  
  if (!expressionTypeCompatibility) {
    semanticErrors.push({
      line: compiledCode[index].line,
      error: "EXPRESSÃO DEVERIA SER DO TIPO BOOLEANO"
    });
  }
}