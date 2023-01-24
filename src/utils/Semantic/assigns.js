import { checkExpressionType } from "../Functions/checkExpressionType";
import { checkIdentifierType } from "../Functions/checkIdentifierType";

export function assigns(firstPosition, lastPosition, compiledCode, variablesTable, semanticErrors) {
  let identifierType = checkIdentifierType(firstPosition, compiledCode, variablesTable);
  let expressionType = checkExpressionType(lastPosition, compiledCode, variablesTable);
  
  console.log(identifierType, expressionType)
  if (identifierType !== expressionType) {
    semanticErrors.push({
      line: compiledCode[firstPosition].line,
      error: "TIPO INCOMPATÍVEL ENTRE IDENTIFICADOR E EXPRESSÃO"
    });
  }
}