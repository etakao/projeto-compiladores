// import { useCompile } from "../../context/Compile";
import { expressions } from "../Semantic/expressions";

export function expression(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors) {
  let lastPosition = firstPosition;

  expressions(lastPosition, compiledCode, variablesTable, semanticErrors);

  let possibleVariables = ['IDENTIFIER', 'FLOAT', 'NUM', 'BOOL'];
  let relation = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  console.log("teste",compiledCode[lastPosition].token);
  if (!possibleVariables.includes(compiledCode[lastPosition].token)) {
    console.log("entrou",compiledCode[lastPosition].token);
    syntaxErrors.push({ 
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
      syntaxErrors.push({ 
        token: compiledCode[lastPosition].token,
        error: "DEVERIA SER UM PONTO E VÍRGULA",
        line: compiledCode[lastPosition].line,
        column: compiledCode[lastPosition].column,
      });
    }
    lastPosition++;
    return lastPosition;  
  }

  lastPosition++;

  if(!possibleVariables.includes(compiledCode[lastPosition].token)){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR OU NÚMERO2",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 
  lastPosition++;

  return lastPosition;
}
