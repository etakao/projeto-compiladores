import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { dictionary } from "../Lexical";
export function looping(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
  let newSyntaxErrors = [];
  let newSemanticErrors = [];
  let countInstruction =0;
  let verifyInstruction = ['ABRE PARENTESES', 'IDENTIFICADOR', 'EXPRESSÃO SIMPLES','IDENTIFICADOR OU VALOR','FECHA PARENTESES'];
  let lastPosition = firstPosition+1 ;
  while (compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'&& lastPosition< compiledCode.length-1 ){
    switch(countInstruction){
      case 0:
       compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',newSyntaxErrors)
       countInstruction++ 
       break;
      case 1:
        if(compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER',newSyntaxErrors)){
          if(variablesTable.find(identify => { identify.value === compiledCode[lastPosition].value }) === undefined){
+            newSemanticErrors.push({ 
              token: compiledCode[lastPosition].token,
              error: "IDENTIFICADOR NAO DECLARADO",
              line: compiledCode[lastPosition].line,
              column: compiledCode[lastPosition].column,
            });
          }
          countInstruction++;
        }
        break;
      case 2:
        compareSyntaxToken(compiledCode[lastPosition],'SIMPLE_EXPRESSION',newSyntaxErrors)
          countInstruction++;
        
        break;
      case 3:
        compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER_VALUE',newSyntaxErrors)
          countInstruction++;     
        break;
      default:
        newSyntaxErrors.push({ 
          token: compiledCode[lastPosition].token,
          error: "CARACTERE EM EXCESSO",
          line: compiledCode[lastPosition].line,
          column: compiledCode[lastPosition].column,
        });  
      }
  
    lastPosition++;
  }
  if(countInstruction < verifyInstruction.length-1){
    while(countInstruction< verifyInstruction.length ){
       newSyntaxErrors.push({ 
              token: verifyInstruction[countInstruction],
              error: `ESTA FALTANDO UM ${verifyInstruction[countInstruction]}`,
              line: compiledCode[lastPosition].line,
              column: countInstruction+1,
            });
      countInstruction ++;
    }
  }
  setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
	setSemanticErrors([...semanticErrors, ...newSemanticErrors]);
	console.log(" syntax errors: ", newSyntaxErrors, "semantic errors: ", newSemanticErrors);
	return lastPosition;
}