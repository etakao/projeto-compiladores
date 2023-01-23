import { dictionary } from "../Lexical";

let relations = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];

export function compareSyntaxToken(compiledCodePosition, syntaxName, syntaxErrors) {
	if(syntaxName === 'TYPES'){
		if (compiledCodePosition.token !== 'INT' && compiledCodePosition.token !== 'BOOL'){
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: "DEVERIA SER UM TIPO",
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			return false;
		}return true;
  	
	}
	else if (syntaxName === 'IDENTIFIER_VALUE'){
		if (compiledCodePosition.token !== 'NUM' && compiledCodePosition.token !== 'IDENTIFIER'){
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: "DEVERIA SER UMA VAR OU UM VALOR",
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			return false;
		}return true;
	}
	else if(syntaxName === 'SIMPLE_EXPRESSION'){
		
		if (relations.find(relation => { relation === compiledCodePosition.value })){
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: "DEVERIA SER SINAL DE EXPRESSÃO",
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			return false;
		}return true;
	}
	else{	
		if (compiledCodePosition.token !== syntaxName){
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: `DEVERIA SER UM ${dictionary[syntaxName]}`,
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			return false;
		}
		return true;
	}
	
}
