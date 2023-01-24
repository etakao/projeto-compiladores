// import { useCompile } from "../../context/Compile";
import { analyzer } from "./analyzer";

export function conditional(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors) {
  let lastPosition = firstPosition + 1;

  if (compiledCode[lastPosition].token !== 'OPEN_PARENTHESIS') {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM ABRE PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);
  
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

  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);

  if(compiledCode[lastPosition].token === 'ELSE'){
    lastPosition++;
    lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);
  }

  return (lastPosition);
}
