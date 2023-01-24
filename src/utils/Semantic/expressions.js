import { checkExpressionType } from "../Functions/checkExpressionType";

export function expressions(index, compiledCode, variablesTable, semanticErrors, generatedCode, dataTable) {
  let {expressionType, expressionValue} = checkExpressionType(index, compiledCode, variablesTable, generatedCode, dataTable);
  console.log("expressionsLog",expressionValue)

  if (expressionType === undefined) {
    semanticErrors.push({
      line: compiledCode[index].line,
      error: "EXPRESSÃO DEVERIA SER DO TIPO BOOLEANO"
    });
  }

  return expressionValue;
}