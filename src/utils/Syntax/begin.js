import { analyzer } from "./analyzer";

export function begin(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  let lastPosition = firstPosition + 1;

  if (lastPosition >= compiledCode.length) {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition-1].token,
      error: "DEVERIA SER UM END",
      line: compiledCode[lastPosition-1].line,
      column: compiledCode[lastPosition-1].column,
    });

    return compiledCode.length-1;
  } else {
    while (compiledCode[lastPosition].token !== 'END' && lastPosition < compiledCode.length-1) {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable);
      console.log("logWhileBegin",compiledCode[lastPosition].token, compiledCode[lastPosition].line, compiledCode[lastPosition].column);
    }

    if (compiledCode[lastPosition].token !== 'END') {
      syntaxErrors.push({ 
        token: compiledCode[compiledCode.length-1].token,
        error: "DEVERIA SER UM END",
        line: compiledCode[compiledCode.length-1].line,
        column: compiledCode[compiledCode.length-1].column,
      });
    }

    lastPosition++;
    
    return lastPosition;
  }
}
