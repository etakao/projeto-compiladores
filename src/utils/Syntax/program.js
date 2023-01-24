import { analyzer } from "./analyzer";

export function program(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  let lastPosition = firstPosition + 1;

  // console.log(compiledCode[lastPosition].token);

  if (compiledCode[lastPosition].token !== 'IDENTIFIER') {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });

  } else {
    if (variablesTable.find(identify => { identify.value === compiledCode[lastPosition].value })) {
      semanticErrors.push({ 
        token: compiledCode[lastPosition].token,
        error: "JA EXISTE UM IDENTIFICADOR COM ESSE NOME",
        line: compiledCode[lastPosition].line,
        column: compiledCode[lastPosition].column,
      });
    } else {
      variablesTable.push({
        ...compiledCode[lastPosition], 
        type: "PROGRAM" 
      });

      generatedCode.push({
        line: generatedCode.length,
        code: "INPP"
      });
    }
  }

  lastPosition++;
  
  // console.log(compiledCode[lastPosition].token);

  if(compiledCode[lastPosition].token !== 'SEMICOLON'){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM PONTO E VIRGULA",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  if (lastPosition >= compiledCode.length) {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition - 1].token,
      error: "DEVERIA SER UM PONTO FINAL",
      line: compiledCode[lastPosition - 1].line,
      column: compiledCode[lastPosition - 1].column,
    });
  } else {
    while (lastPosition < compiledCode.length-1 && compiledCode[lastPosition].token !== 'DOT') {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors,generatedCode, dataTable);
    }
    
    if (lastPosition>= compiledCode.length) {
      syntaxErrors.push({ 
        token: compiledCode[compiledCode.length-1].token,
        error: "DEVERIA FECHAR COM UM PONTO FINAL",
        line: compiledCode[compiledCode.length-1].line,
        column: compiledCode[compiledCode.length-1].column,
      });
    }else if(compiledCode[lastPosition].token  !== 'DOT'){
      syntaxErrors.push({ 
        token: compiledCode[compiledCode.length-1].token,
        error: "DEVERIA FECHAR COM UM PONTO FINAL",
        line: compiledCode[compiledCode.length-1].line,
        column: compiledCode[compiledCode.length-1].column,
      });
    }
  }
}
