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
//import { useCompile } from '../../context/Compile';

export function analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
/*  const { 
    compiledCode,
    updateCompiledCode,
    variablesTable,
    updateVariablesTable,
    syntaxErrors,
    updateSyntaxErrors,
    semanticErrors, 
    updateSemanticErrors
  } = useCompile();
*/
let updatedLastPosition = lastPosition;
    
  switch (compiledCode[lastPosition].token) {
    case "PROGRAM":
      program(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      ); 
    break;

    case "INT":
      updatedLastPosition = identifier(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "BOOL":
      updatedLastPosition = identifier(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "PROCEDURE":
      updatedLastPosition = procedure(
        updatedLastPosition+1, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "BEGIN":
      updatedLastPosition = begin(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "IDENTIFIER":
      updatedLastPosition = assign(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "IF":
      updatedLastPosition = conditional(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "WHILE":
      updatedLastPosition = looping(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "READ":
      updatedLastPosition = readOrWrite(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    case "WRITE":
      updatedLastPosition = readOrWrite(
        updatedLastPosition, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors
      );
    break;

    default:
      console.log("DEU RUIM");
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
