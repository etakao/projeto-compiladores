export function identifier(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors) {
  let identifierType = compiledCode[firstPosition].token;
  let lastPosition = firstPosition + 1;

  for (let index = 0; (index + lastPosition) < compiledCode.length; index++) {
    if ((lastPosition + index) === compiledCode.length - 1) {
      if (compiledCode[lastPosition + index].token !== 'SEMICOLON') {
        syntaxErrors.push({
          token: compiledCode[lastPosition + index].token,
          error: "DEVERIA SER UM PONTO E VÍRGULA",
          line: compiledCode[lastPosition + index].line,
          column: compiledCode[lastPosition + index].column,
        });
      }

      return lastPosition + index;
    }

    if (index % 2 === 0) {
      if (compiledCode[lastPosition + index].token !== 'IDENTIFIER') {
        syntaxErrors.push({ 
          token: compiledCode[lastPosition + index].token,
          error: "DEVERIA SER UM IDENTIFICADOR",
          line: compiledCode[lastPosition + index].line,
          column: compiledCode[lastPosition + index].column,
        });
    
      } else {
        if (variablesTable.find(identify => { identify.value === compiledCode[lastPosition + index].value })) {
          semanticErrors.push({ 
            token: compiledCode[lastPosition + index].token,
            error: "JA EXISTE UM IDENTIFICADOR COM ESSE NOME",
            line: compiledCode[lastPosition + index].line,
            column: compiledCode[lastPosition + index].column,
          });
        } else {
          variablesTable.push({
            ...compiledCode[lastPosition + index],
            type: identifierType
          });
        }
      }
    } else {
      if (compiledCode[lastPosition + index].token === 'SEMICOLON') {
        return lastPosition + index + 1;
      }
      else {
        if (compiledCode[lastPosition + index].token !== 'COMMA') {
          syntaxErrors.push({
            token: compiledCode[lastPosition + index].token,
            error: "DEVERIA SER UMA VÍRGULA",
            line: compiledCode[lastPosition + index].line,
            column: compiledCode[lastPosition + index].column,
          });
        }
      }
    }
  }
}