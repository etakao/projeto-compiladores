import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { verifyIdentifier } from "../Functions/verifyIdentifier";
export function readOrWrite(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){ 
    let lastPosition = firstPosition + 1; 
    let newSemanticErrors = [];
	let newSyntaxErrors = [];
	let countInstruction =0;
  let verifyInstruction = ['ABRE PARENTESES', 'IDENTIFICADOR','FECHA PARENTESES'];
  
  while (compiledCode[lastPosition].token !== 'SEMICOLON'&& lastPosition< compiledCode.length-1 ){
    switch(countInstruction){
      case 0:
       compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',newSyntaxErrors)
       countInstruction++ 
       break;
      case 1:
        let index = 0;
        while(compiledCode[lastPosition+index].token !== 'CLOSE_PARENTHESIS'&& lastPosition+index< compiledCode.length-1 ){
        if(index % 2 ==0){
            if(compareSyntaxToken(compiledCode[lastPosition+index],'IDENTIFIER',newSyntaxErrors)){
                verifyIdentifier(compiledCode[lastPosition+index],newSyntaxErrors,newSemanticErrors,variablesTable)
            }
        }
            else{
                compareSyntaxToken(compiledCode[lastPosition+index],'COMMA',newSyntaxErrors)
            }
            index ++;
        }
        lastPosition = lastPosition + index-1;
        countInstruction++ 
        break;
        case 2:
            compareSyntaxToken(compiledCode[lastPosition],'CLOSE_PARENTHESIS',newSyntaxErrors)
            countInstruction++ 
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
  compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',newSyntaxErrors);
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
	return lastPosition+1;
}