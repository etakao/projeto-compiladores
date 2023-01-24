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

export function analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  let updatedLastPosition = lastPosition;

  switch (compiledCode[lastPosition].token) {
    case "PROGRAM":
      program(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "INT":
      updatedLastPosition = identifier(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "BOOL":
      updatedLastPosition = identifier(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "PROCEDURE":
      updatedLastPosition = procedure(
        updatedLastPosition + 1,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "BEGIN":
      updatedLastPosition = begin(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "IDENTIFIER":
      updatedLastPosition = assign(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "IF":
      updatedLastPosition = conditional(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "WHILE":
      updatedLastPosition = looping(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "READ":
      updatedLastPosition = readOrWrite(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "WRITE":
      updatedLastPosition = readOrWrite(
        updatedLastPosition,
        compiledCode,
        variablesTable,
        syntaxErrors,
        semanticErrors,
        generatedCode,
        dataTable
      );
      break;

    case "COMMENT_LINE":
      updatedLastPosition++;
      break;

    case "OPEN_COMMENT":
      updatedLastPosition++;
      while (compiledCode[updatedLastPosition].token !== "CLOSE_COMMENT" && updatedLastPosition < compiledCode.length){
        updatedLastPosition++;
      }
      break;

    case "DOT":
      if (updatedLastPosition >= compiledCode.length) {
        syntaxErrors.push({
          token: compiledCode[updatedLastPosition].token,
          error: "ERRO DE SINTAXE",
          line: compiledCode[updatedLastPosition].line,
          column: compiledCode[updatedLastPosition].column,
        });
        updatedLastPosition++;
      }
      break;

    default:
      // console.log("analyserLog",compiledCode[lastPosition].token,compiledCode[lastPosition].line, compiledCode[lastPosition].column);
      syntaxErrors.push({
        token: compiledCode[updatedLastPosition].token,
        error: "ERRO DE SINTAXE",
        line: compiledCode[updatedLastPosition].line,
        column: compiledCode[updatedLastPosition].column,
      });
      updatedLastPosition++;
      break;
  }

  return updatedLastPosition;
}
