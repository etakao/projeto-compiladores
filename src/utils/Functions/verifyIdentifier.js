export function verifyIdentifier(compiledCodePosition, syntaxErrors,semanticErrors,variablesTable){
	let identifier = undefined;

    if(compiledCodePosition.token !=='IDENTIFIER'){
		syntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: "DEVERIA SER UM IDENTIFICADOR",
			line: compiledCodePosition.line,
			column:  compiledCodePosition.column
		});	
       
	}
	else {
    for (let index = 0; index < variablesTable.length; index++) {
      if (compiledCodePosition.value === variablesTable[index].value){
        identifier = variablesTable[index]
      }
    }

    if(identifier === undefined){
        semanticErrors.push({ 
            token: compiledCodePosition.token,
            error: "IDENTIFICADOR NAO DECLARADO ",
            line: compiledCodePosition.line,
            column: compiledCodePosition.column,
        });
    }
   
  }
}