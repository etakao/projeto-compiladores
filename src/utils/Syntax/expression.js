import { expressions } from "../Semantic/expressions";

export function expression(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  let lastPosition = firstPosition;
  
  let expressionValue = expressions(lastPosition, compiledCode, variablesTable, semanticErrors, generatedCode, dataTable);

  let possibleVariables = ['IDENTIFIER', 'FLOAT', 'NUM', 'BOOL', 'TRUE', 'FALSE'];
  let relation = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER', 'MINUS', 'SUM', 'DIVIDE', 'MULTIPLY'];

  if (!possibleVariables.includes(compiledCode[lastPosition].token)) {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }
  lastPosition++;

  if (compiledCode[lastPosition].token === "SEMICOLON" || compiledCode[lastPosition].token === "CLOSE_PARENTHESIS") {
    return { 
      expressionLastPosition: lastPosition,
      expressionValue: expressionValue
     };
  }

  if (!relation.includes(compiledCode[lastPosition].token)) {
    return { 
      expressionLastPosition: lastPosition,
      expressionValue: expressionValue
     };
  } 
  lastPosition++;

  if(!possibleVariables.includes(compiledCode[lastPosition].token)){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 
  lastPosition++;

  return { 
    expressionLastPosition: lastPosition,
    expressionValue: expressionValue
   };
}
