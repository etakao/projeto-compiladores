import { checkIdentifier } from "../Functions/checkIdentifier";

export function identifier(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
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
        checkIdentifier(compiledCode[index + lastPosition], syntaxErrors, semanticErrors, variablesTable, identifierType, generatedCode, dataTable);
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