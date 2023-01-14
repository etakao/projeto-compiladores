import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { checkIdentifier } from "../Functions/checkIdentifier";
export function procedure(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
	let lastPosition = firstPosition; (lastPosition === 0? lastPosition = 1: lastPosition  );
	let newSemanticErrors = [];
	let newSyntaxErrors = [];
	let countIntruction =0;
	var isIdentifier = true;
	while(compiledCode[lastPosition].token !== 'SEMICOLON'&& lastPosition< compiledCode.length){
		switch(countIntruction){
		case 0:
		checkIdentifier(compiledCode[lastPosition],
						syntaxErrors,
						semanticErrors,
						variablesTable,
						setVariablesTable)
		lastPosition++;
		countIntruction++;
		break;
		case 1:
			compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',newSyntaxErrors);
		lastPosition++;
		countIntruction++;
		break;
		case 2:
			(compareSyntaxToken(compiledCode[lastPosition],'VAR',newSyntaxErrors)?countIntruction ++:countIntruction);
			lastPosition++;
			countIntruction++;	
		break;
		case 3:
			 
			while(compiledCode[lastPosition].token === 'IDENTIFIER' || compiledCode[lastPosition].token === 'COMMA'){
			(isIdentifier ?
				 checkIdentifier(compiledCode[lastPosition], syntaxErrors,semanticErrors, variablesTable, setVariablesTable)
			:
				compareSyntaxToken(compiledCode[lastPosition],'COMMA',newSyntaxErrors)
			);
				isIdentifier = !isIdentifier;
				lastPosition ++;
			}// fim do while loop
			countIntruction ++;
		break;
		case 4:
			if(isIdentifier){compareSyntaxToken(compiledCode[lastPosition-1],'COLON',newSyntaxErrors);}
			else{compareSyntaxToken(compiledCode[lastPosition],'COLON',newSyntaxErrors);}
			lastPosition++;
			countIntruction ++;
		break;
		case 5:
			compareSyntaxToken(compiledCode[lastPosition],'TYPES',newSyntaxErrors);
			lastPosition++;
			countIntruction ++;
		break;
		case 6:
			compareSyntaxToken(compiledCode[lastPosition],'CLOSE_PARENTHESIS',newSyntaxErrors);
			lastPosition++;
			countIntruction ++;
		break;
		case 7:
			compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',newSyntaxErrors);
			return lastPosition;
		break;
		default: 
		newSyntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: `VARIAVEL EM EXCESSO`,
			line: compiledCodePosition.line,
			column:  compiledCodePosition.column
		});
		 lastPosition++;
		 break;
	}
	}
	const a =compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',newSyntaxErrors);
	

	setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);
	setSemanticErrors([...semanticErrors, ...newSemanticErrors]);
	console.log(" syntax errors: ", newSyntaxErrors, "semantic errors: ", newSemanticErrors);
	return lastPosition;
}

