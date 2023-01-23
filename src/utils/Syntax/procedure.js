import { compareSyntaxToken } from "../Functions/compareSyntaxToken";
import { checkIdentifier } from "../Functions/checkIdentifier";
export function procedure(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
	let lastPosition = firstPosition; (lastPosition === 0? lastPosition = 1: lastPosition  );
	let newSemanticErrors = [];
	let newSyntaxErrors = [];
	let countInstruction =0;
	var isIdentifier = true;
	while(compiledCode[lastPosition].token !== 'SEMICOLON'&& lastPosition< compiledCode.length-1){
		switch(countInstruction){
		case 0:
		checkIdentifier(compiledCode[lastPosition],syntaxErrors,semanticErrors,variablesTable,setVariablesTable)
		lastPosition++;
		countInstruction++;
		break;
		case 1:
			compareSyntaxToken(compiledCode[lastPosition],'OPEN_PARENTHESIS',newSyntaxErrors);
		lastPosition++;
		countInstruction++;
		break;
		case 2:
			compareSyntaxToken(compiledCode[lastPosition],'VAR',newSyntaxErrors);
			lastPosition++;
			countInstruction++;	
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
			countInstruction ++;
		break;
		case 4:
			if(isIdentifier){compareSyntaxToken(compiledCode[lastPosition-1],'COLON',newSyntaxErrors);}
			else{compareSyntaxToken(compiledCode[lastPosition],'COLON',newSyntaxErrors);}
			lastPosition++;
			countInstruction ++;
		break;
		case 5:
			compareSyntaxToken(compiledCode[lastPosition],'TYPES',newSyntaxErrors);
			lastPosition++;
			countInstruction ++;
		break;
		case 6:
			compareSyntaxToken(compiledCode[lastPosition],'CLOSE_PARENTHESIS',newSyntaxErrors);
			lastPosition++;
			countInstruction ++;
		break;
		case 7:
			compareSyntaxToken(compiledCode[lastPosition],'SEMICOLON',newSyntaxErrors);
			return lastPosition;
	
		default: 
		newSyntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: `VARIÁVEL EM EXCESSO`,
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

