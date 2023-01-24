import { analyzer } from "./analyzer";

export function begin(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors){
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
    while (compiledCode[lastPosition].token !== 'END' && lastPosition < compiledCode.length ) {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);
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
    if (compiledCode[lastPosition].token !== 'SEMICOLON'&& compiledCode[lastPosition].token !== 'DOT') {
      syntaxErrors.push({ 
        token: compiledCode[lastPosition].token,
        error: "DEVERIA SER UM PONTO E VÍRGULA",
        line: compiledCode[lastPosition].line,
        column: compiledCode[lastPosition].column,
      });
    }
    if(compiledCode[lastPosition].token !== 'DOT'){
      lastPosition++;
    }
    return lastPosition;
  }
}
