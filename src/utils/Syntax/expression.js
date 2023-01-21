// import { useCompile } from "../../context/Compile";
import { simpleExpression } from "./simpleExpression";

export function expression(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  let possibleVariables = ['IDENTIFIER', 'FLOAT', 'INT', ];
  let relation = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  
  if (!possibleVariables.includes(compiledCode[lastPosition].token)) {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } else {
    lastPosition++;
  }

  if (!relation.includes(compiledCode[lastPosition].token)) {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UMA RELAÇÃO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } else {
    lastPosition++;
  } 
  
  if (compiledCode[lastPosition].token !== "IDENTIFIER") {
    
  } else {
    lastPosition++;
  }

  if(!possibleVariables.includes(compiledCode[lastPosition].token)){
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 

  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  return lastPosition;
}
