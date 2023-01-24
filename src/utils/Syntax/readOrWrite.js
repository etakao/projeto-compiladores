import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { verifyIdentifier } from "../Functions/verifyIdentifier";

export function readOrWrite(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable){ 
    let lastPosition = firstPosition + 1;
	let countInstruction =0;
  let verifyInstruction = ['ABRE PARENTESES', 'IDENTIFICADOR','FECHA PARENTESES'];
  
  while (compiledCode[lastPosition].token !== 'SEMICOLON'&& lastPosition< compiledCode.length-1 ){
    switch(countInstruction){
      case 0:
       compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',syntaxErrors)
       countInstruction++ 
       break;
      case 1:
        let index = 0;
        while(compiledCode[lastPosition+index].token !== 'CLOSE_PARENTHESIS'&& lastPosition+index< compiledCode.length-1 ){
        if(index % 2 ==0){
            if(compareSyntaxToken(compiledCode[lastPosition+index],'IDENTIFIER',syntaxErrors)){
                verifyIdentifier(compiledCode[lastPosition+index],syntaxErrors,semanticErrors,variablesTable)
            }
        }
            else{
                compareSyntaxToken(compiledCode[lastPosition+index],'COMMA',syntaxErrors)
            }
            index ++;
        }
        lastPosition = lastPosition + index-1;
        countInstruction++ 
        break;
        case 2:
            compareSyntaxToken(compiledCode[lastPosition],'CLOSE_PARENTHESIS',syntaxErrors)
            countInstruction++ 
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
  compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',syntaxErrors);
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
	return lastPosition+1;
}