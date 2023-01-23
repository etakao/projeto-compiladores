// import { useCompile } from "../../context/Compile";
import { simpleExpression } from "./simpleExpression";

export function expression(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition;

  let possibleVariables = ['IDENTIFIER', 'FLOAT', 'NUM', 'BOOL'];
  let relation = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  console.log("teste",compiledCode[lastPosition].token);
  if (!possibleVariables.includes(compiledCode[lastPosition].token)) {
    console.log("entrou",compiledCode[lastPosition].token);
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }
  lastPosition++;

  if (!relation.includes(compiledCode[lastPosition].token)) {
    console.log(compiledCode[lastPosition].token, compiledCode[lastPosition].column);
    if (compiledCode[lastPosition].token !== "SEMICOLON") {
      newSyntaxErrors.push({ 
        token: compiledCode[lastPosition].token,
        error: "DEVERIA SER UM PONTO E VÍRGULA",
        line: compiledCode[lastPosition].line,
        column: compiledCode[lastPosition].column,
      });
    }
    lastPosition++;
    setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
    setSemanticErrors([...semanticErrors, ...newSemanticErrors]);
    return lastPosition;  
  }

  lastPosition++;

  if(!possibleVariables.includes(compiledCode[lastPosition].token)){
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO2",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 
  lastPosition++;

  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  return lastPosition;
}
