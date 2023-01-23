// import { useCompile } from "../../context/Compile";
import { analyzer } from "./analyzer";

export function simpleExpression(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
  let relation =['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  if (compiledCode[lastPosition].token !== 'MINUS'){
    if (compiledCode[lastPosition].token){

    };
    }
  else {
    if (variablesTable.find(identify => { identify.value === compiledCode[lastPosition].value })) {
      newSemanticErrors.push({ 
        token: compiledCode[lastPosition].token,
        error: "JA EXISTE UM INDENTIFICADOR COM ESSE NOME",
        line: compiledCode[lastPosition].line,
        column: compiledCode[lastPosition].column,
      });
    } else {
      // variables.push(compiledCode[lastPosition]);
      setVariablesTable([...variablesTable, compiledCode[lastPosition]]);
    }
  }

  lastPosition++;
  
  // console.log(compiledCode[lastPosition].token);

  if(compiledCode[lastPosition].token !== 'SEMICOLON'){
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM PONTO E VIRGULA",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 


  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  setSemanticErrors([...semanticErrors, ...newSemanticErrors]);

  lastPosition++;

  if (lastPosition >= compiledCode.length) {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition-1].token,
      error: "DEVERIA SER UM PONTO FINAL",
      line: compiledCode[lastPosition-1].line,
      column: compiledCode[lastPosition-1].column,
    });
    
    setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  } else {
    while (compiledCode[lastPosition].token !== 'DOT' && lastPosition < compiledCode.length) {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
    }

    if ( lastPosition >= compiledCode.length){
      newSyntaxErrors.push({ 
        token: compiledCode[lastPosition-1].token,
        error: "DEVERIA SER UM PONTO FINAL",
        line: compiledCode[lastPosition-1].line,
        column: compiledCode[lastPosition-1].column,
      });
    
      setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
    }
  }

  // while (compiledCode[lastPosition].token !== 'DOT' && lastPosition < compiledCode.length) {
  //   lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
  // }
  // if ( lastPosition >= compiledCode.length){
  //   newSyntaxErrors.push({ 
  //     token: compiledCode[lastPosition-1].token,
  //     error: "DEVERIA SER UM PONTO FINAL",
  //     line: compiledCode[lastPosition-1].line,
  //     column: compiledCode[lastPosition-1].column,
  //   });
    
  //   setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  // }
  
  // console.log("Syntax errors: ", newSyntaxErrors);
  // console.log("Semantic errors: ", newSemanticErrors);
  // console.log("Last Position: ", lastPosition);
}
