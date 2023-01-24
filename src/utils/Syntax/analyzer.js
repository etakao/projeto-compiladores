import { 
  begin,
  conditional,
  assign,
  identifier,
  looping,
  procedure,
  program,
  readOrWrite, 
 } from '.';

export function analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors) {
  let updatedLastPosition = lastPosition;
    
  switch (compiledCode[lastPosition].token) {
    case "PROGRAM":
      program(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      ); 
    break;

    case "INT":
      updatedLastPosition = identifier(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "BOOL":
      updatedLastPosition = identifier(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "PROCEDURE":
      updatedLastPosition = procedure(
        updatedLastPosition+1, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "BEGIN":
      updatedLastPosition = begin(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "IDENTIFIER":
      updatedLastPosition = assign(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "IF":
      updatedLastPosition = conditional(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "WHILE":
      updatedLastPosition = looping(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "READ":
      updatedLastPosition = readOrWrite(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "WRITE":
      updatedLastPosition = readOrWrite(
        updatedLastPosition, 
        compiledCode,
        variablesTable,
        syntaxErrors, 
        semanticErrors
      );
    break;

    case "DOT":
      if (updatedLastPosition >= compiledCode.lenght){
        console.log("DEU RUIM");
      setSyntaxErrors([...syntaxErrors, { 
        token: compiledCode[updatedLastPosition].token,
        error: "ERRO DE SINTAXE",
        line: compiledCode[updatedLastPosition].line,
        column: compiledCode[updatedLastPosition].column,
      }]);
      updatedLastPosition++;
      }
    break;

    default:
      console.log("analyserLog",compiledCode[lastPosition].token, compiledCode[lastPosition].column);
      setSyntaxErrors([...syntaxErrors, { 
        token: compiledCode[updatedLastPosition].token,
        error: "ERRO DE SINTAXE",
        line: compiledCode[updatedLastPosition].line,
        column: compiledCode[updatedLastPosition].column,
      }]);
      updatedLastPosition++;
    break;
  }

  return updatedLastPosition;
}
