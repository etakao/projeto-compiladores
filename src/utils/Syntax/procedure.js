import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { checkIdentifier } from "../Functions/checkIdentifier";

export function procedure(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors, generatedCode, dataTable) {
	let lastPosition = firstPosition; (lastPosition === 0? lastPosition = 1: lastPosition  );
	let countInstruction = 0;
	var isIdentifier = true;

	while(compiledCode[lastPosition].token !== 'SEMICOLON'&& lastPosition< compiledCode.length-1){
		switch(countInstruction){
			case 0:
				checkIdentifier(compiledCode[lastPosition],syntaxErrors,semanticErrors,variablesTable,'PROCEDURE');
				lastPosition++;
				countInstruction++;
			break;
			case 1:
				compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',syntaxErrors);
				lastPosition++;
				countInstruction++;
			break;
			case 2:
				compareSyntaxToken(compiledCode[lastPosition],'VAR',syntaxErrors);
				lastPosition++;
				countInstruction++;	
			break;
			case 3:
				while(compiledCode[lastPosition].token === 'IDENTIFIER' || compiledCode[lastPosition].token === 'COMMA'){
				if(isIdentifier) {
					checkIdentifier(compiledCode[lastPosition], syntaxErrors,semanticErrors, variablesTable,'INT');
					
				}else{
					compareSyntaxToken(compiledCode[lastPosition],'COMMA',syntaxErrors)
				}
					isIdentifier = !isIdentifier;
					lastPosition ++;
				}// fim do while loop
				countInstruction ++;
			break;
			case 4:
				if(isIdentifier){compareSyntaxToken(compiledCode[lastPosition-1],'COLON',syntaxErrors);}
				else{compareSyntaxToken(compiledCode[lastPosition],'COLON',syntaxErrors);}
				lastPosition++;
				countInstruction ++;
			break;
			case 5:
				compareSyntaxToken(compiledCode[lastPosition],'TYPES',syntaxErrors);
				lastPosition++;
				countInstruction ++;
			break;
			case 6:
				compareSyntaxToken(compiledCode[lastPosition],'CLOSE_PARENTHESIS',syntaxErrors);
				lastPosition++;
				countInstruction ++;
			break;
			case 7:
				compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',syntaxErrors);
				return lastPosition++;
		
			default: 
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: `VARIÁVEL EM EXCESSO`,
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			lastPosition++;
			break;
		}
	}
	const a =compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',syntaxErrors);
	lastPosition++;
	return lastPosition;
}

