export function identifier(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  for (let index = 0; (index + lastPosition) < compiledCode.length; index++) {
    if ((lastPosition + index) == compiledCode.length - 1) {
      if (compiledCode[lastPosition + index].token !== 'SEMICOLON') {
        newSyntaxErrors.push({
          token: compiledCode[lastPosition + index].token,
          error: "DEVERIA SER UM PONTO E VÍRGULA",
          line: compiledCode[lastPosition + index].line,
          column: compiledCode[lastPosition + index].column,
        });
      }
      
      setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
      setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

      return lastPosition + index;
    }

    if (index % 2 === 0) {
      if (compiledCode[lastPosition + index].token !== 'IDENTIFIER') {
        newSyntaxErrors.push({ 
          token: compiledCode[lastPosition + index].token,
          error: "DEVERIA SER UM IDENTIFICADOR",
          line: compiledCode[lastPosition + index].line,
          column: compiledCode[lastPosition + index].column,
        });
    
      } else {
        if (variablesTable.find(identify => { identify.value === compiledCode[lastPosition + index].value })) {
          newSemanticErrors.push({ 
            token: compiledCode[lastPosition + index].token,
            error: "JA EXISTE UM INDENTIFICADOR COM ESSE NOME",
            line: compiledCode[lastPosition + index].line,
            column: compiledCode[lastPosition + index].column,
          });
        } else {
          setVariablesTable([...variablesTable, compiledCode[lastPosition + index]]);
        }
      }
    } else {
      if (compiledCode[lastPosition + index].token === 'SEMICOLON') {
        setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
        setSemanticErrors([...semanticErrors, ...newSemanticErrors]);
        
        return lastPosition + index;
      }
      else {
        if (compiledCode[lastPosition + index].token !== 'COMMA') {
          newSyntaxErrors.push({
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