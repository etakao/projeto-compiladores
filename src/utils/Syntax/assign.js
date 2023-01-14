export function assign(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  while (lastPosition < compiledCode.length) {
    // a := (b * c) + d;
    switch (compiledCode[lastPosition].token) { 
      case "OPEN_PARENTHESIS":
        lastPosition++;

        if (compiledCode[lastPosition].token !== "IDENTIFIER" || 
        compiledCode[lastPosition].token !== "NUM" ||
        compiledCode[lastPosition].token !== "BOOLEAN") {

        }
      break;

      case "IDENTIFIER":
        lastPosition++;

        if (compiledCode[lastPosition].token )
      break;

      case "BOOLEAN":
        lastPosition++;
        
        if (compiledCode[lastPosition].token !== "SEMICOLON") {
          newSyntaxErrors.push({
            token: compiledCode[lastPosition].token,
            error: "DEVERIA SER UM PONTO E VÍRGULA",
            line: compiledCode[lastPosition].line,
            column: compiledCode[lastPosition].column
          });
        }
      break;
      
      default:
      break;
    }
    break;
  }
}