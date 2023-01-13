import { identifier, program } from '.';
//import { useCompile } from '../../context/Compile';

export function analyzer(position, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
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
    
  switch (compiledCode[position].token) {
    case "PROGRAM":
    program(position, 
        compiledCode, 
        variablesTable, 
        setVariablesTable, 
        syntaxErrors, 
        setSyntaxErrors, 
        semanticErrors, 
        setSemanticErrors) 
    // program(position);
    break;

    case "INT"|"BOOL":
      //identifier( position);
    break;

    case "PROCEDURE":

    break;

    case "BEGIN":

    break;

    case "IF":

    break;

    case "WHILE":

    break;

    case "READ" | "WRITE":
      //readOrWrite(position);
    break;

    default:
    break;
  }
}
