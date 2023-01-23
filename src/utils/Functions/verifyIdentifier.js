export function verifyIdentifier(compiledCodePosition, syntaxErrors,semanticErrors,variablesTable){
	if(compiledCodePosition.token !=='IDENTIFIER'){
		syntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: "DEVERIA SER UM IDENTIFICADOR",
			line: compiledCodePosition.line,
			column:  compiledCodePosition.column
		});	
       
	}
	else {
    if(variablesTable.find(identify => { identify.value === compiledCodePosition.value })=== undefined){
        semanticErrors.push({ 
            token: compiledCodePosition.token,
            error: "IDENTIFICADOR NAO DECLARADO ",
            line: compiledCodePosition.line,
            column: compiledCodePosition.column,
        });
    }
     
    } 

}