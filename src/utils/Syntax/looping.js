import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import {  verifyIdentifier } from "../Functions/verifyIdentifier";
import { analyzer } from "./analyzer";
import { expression } from "./expression";

export function looping(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
  // let countInstruction =0;
  let lastPosition = firstPosition+1 ;
  // let verifyInstruction = ['ABRE PARENTESES', 'IDENTIFICADOR', 'EXPRESSÃO SIMPLES','IDENTIFICADOR OU VALOR','FECHA PARENTESES'];

  if (compiledCode[lastPosition].token !== 'OPEN_PARENTHESIS') {
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM ABRE PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;

  let {expressionLastPosition, expressionValue} = expression(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors,generatedCode, dataTable);
  lastPosition = expressionLastPosition;
  
  if(compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM FECHA PARÊNTESIS",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  } 

  lastPosition++;

  if(compiledCode[lastPosition].token !== 'DO'){
    syntaxErrors.push({ 
      token: compiledCode[lastPosition].token,
      error: "DEVERIA SER UM DO",
      line: compiledCode[lastPosition].line,
      column: compiledCode[lastPosition].column,
    });
  }

  lastPosition++;
  
  lastPosition = analyzer(lastPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors);

  return lastPosition;

  // while (compiledCode[lastPosition].token !== 'CLOSE_PARENTHESIS'&& lastPosition< compiledCode.length-1 ){
  //   switch(countInstruction){
  //     case 0:
  //      compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',syntaxErrors)
  //      countInstruction++ 
  //      break;
  //     case 1:
  //       if(compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER',syntaxErrors)){
  //         verifyIdentifier(compiledCode[lastPosition],syntaxErrors,semanticErrors,variablesTable)
  //         countInstruction++;
  //       }
  //       break;
  //     case 2:
  //       compareSyntaxToken(compiledCode[lastPosition],'SIMPLE_EXPRESSION',syntaxErrors)
  //         countInstruction++;
        
  //       break;
  //     case 3:
  //       compareSyntaxToken(compiledCode[lastPosition],'IDENTIFIER_VALUE',syntaxErrors)
  //         countInstruction++;     
  //       break;
  //     default:
  //       syntaxErrors.push({ 
  //         token: compiledCode[lastPosition].token,
  //         error: "CARACTERE EM EXCESSO",
  //         line: compiledCode[lastPosition].line,
  //         column: compiledCode[lastPosition].column,
  //       });  
  //     }
  
  //   lastPosition++;
  // }
  // if(countInstruction < verifyInstruction.length-1){
  //   while(countInstruction< verifyInstruction.length ){
  //      syntaxErrors.push({ 
  //             token: verifyInstruction[countInstruction],
  //             error: `ESTA FALTANDO UM ${verifyInstruction[countInstruction]}`,
  //             line: compiledCode[lastPosition].line,
  //             column: countInstruction+1,
  //           });
  //     countInstruction ++;
  //   }
  // }
	// console.log(" syntax errors: ", syntaxErrors, "semantic errors: ", semanticErrors);
	// return lastPosition;
}