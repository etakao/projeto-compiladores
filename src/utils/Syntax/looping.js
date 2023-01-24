import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import {  verifyIdentifier } from "../Functions/verifyIdentifier";

export function looping(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors){
  let countInstruction =0;
  let verifyInstruction = ['ABRE PARENTESES', 'IDENTIFICADOR', 'EXPRESSÃO SIMPLES','IDENTIFICADOR OU VALOR','FECHA PARENTESES'];
  let lastPosition = firstPosition+1 ;

  while (compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'&& lastPosition< compiledCode.length-1 ){
    switch(countInstruction){
      case 0:
       compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',syntaxErrors)
       countInstruction++ 
       break;
      case 1:
        if(compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER',syntaxErrors)){
          verifyIdentifier(compiledCode[lastPosition],syntaxErrors,semanticErrors,variablesTable)
          countInstruction++;
        }
        break;
      case 2:
        compareSyntaxToken(compiledCode[lastPosition],'SIMPLE_EXPRESSION',syntaxErrors)
          countInstruction++;
        
        break;
      case 3:
        compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER_VALUE',syntaxErrors)
          countInstruction++;     
        break;
      default:
        syntaxErrors.push({ 
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
       syntaxErrors.push({ 
              token: verifyInstruction[countInstruction],
              error: `ESTA FALTANDO UM ${verifyInstruction[countInstruction]}`,
              line: compiledCode[lastPosition].line,
              column: countInstruction+1,
            });
      countInstruction ++;
    }
  }
	console.log(" syntax errors: ", syntaxErrors, "semantic errors: ", semanticErrors);
	return lastPosition;
}