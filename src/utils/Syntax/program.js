// import { useCompile } from "../../context/Compile";
import { analyzer } from "./analyzer";

export function program(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors) {
  // const { 
  //   compiledCode,
  //   updateCompiledCode,
  //   variablesTable,
  //   updateVariablesTable,
  //   syntaxErrors,
  //   updateSyntaxErrors,
  //   semanticErrors, 
  //   updateSemanticErrors 
  // } = useCompile();

  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let lastPosition = firstPosition + 1;

  // console.log(compiledCode[lastPosition].token);

  if (compiledCode[lastPosition].token !== 'IDENTIFIER') {
    newSyntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM IDENTIFICADOR",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });

  } else {
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
      token: compiledCode[lastPosition - 1].token,
      error: "DEVERIA SER UM PONTO FINAL",
      line: compiledCode[lastPosition - 1].line,
      column: compiledCode[lastPosition - 1].column,
    });
    
    setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
  } else {
    while (lastPosition < compiledCode.length && compiledCode[lastPosition].token !== 'DOT') {
      lastPosition = analyzer(lastPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors);
      lastPosition++;
    }

    // console.log(compiledCode[lastPosition].token)
    if (lastPosition >= compiledCode.length) {
      newSyntaxErrors.push({ 
        token: compiledCode[compiledCode.length-1].token,
        error: "DEVERIA FECHAR COM UM PONTO FINAL",
        line: compiledCode[compiledCode.length-1].line,
        column: compiledCode[compiledCode.length-1].column,
      });
    
      setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
    }
  }
}
