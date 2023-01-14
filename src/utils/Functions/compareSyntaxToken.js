import { dictionary } from "../Lexical";

export function compareSyntaxToken(compiledCodePosition, syntaxName, syntaxErrors) {
	if(syntaxName !== 'TYPES'){
  	if (compiledCodePosition.token !== syntaxName){
		syntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: `DEVERIA SER UM ${dictionary[syntaxName]}`,
			line: compiledCodePosition.line,
			column:  compiledCodePosition.column
		});
		
	}
	}else{
		if (compiledCodePosition.token !== 'INT' && compiledCodePosition.token !== 'BOOL'){
			syntaxErrors.push({ 
				token: compiledCodePosition.token,
				error: "DEVERIA SER UM TIPO",
				line: compiledCodePosition.line,
				column:  compiledCodePosition.column
			});
			
		}
	}
	
}
