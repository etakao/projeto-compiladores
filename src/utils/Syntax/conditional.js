import { analyzer } from "./analyzer";
import { expression } from "./expression";

export function conditional(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  let lastPosition = firstPosition + 1;
  console.log("logConditional:", compiledCode[lastPosition].token);

  if (compiledCode[lastPosition].token !== 'OPEN_PARENTHESIS') {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM ABRE PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  let {expressionLastPosition, expressionValue} = expression(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable);
  lastPosition = expressionLastPosition;

  if(compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM FECHA PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 

  lastPosition++;

  if(compiledCode[lastPosition].token !== 'THEN'){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM THEN",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;
  
  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors,generatedCode, dataTable);

  if(compiledCode[lastPosition].token === 'ELSE'){
    lastPosition++;
    lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors,generatedCode, dataTable);
  }

  return lastPosition;
}
