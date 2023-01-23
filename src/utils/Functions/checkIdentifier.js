export function checkIdentifier(compiledCodePosition, syntaxErrors,semanticErrors,variablesTable, setVariablesTable){
	if(compiledCodePosition.token !=='IDENTIFIER'){
		syntaxErrors.push({ 
			token: compiledCodePosition.token,
			error: "DEVERIA SER UM IDENTIFICADOR",
			line: compiledCodePosition.line,
			column:  compiledCodePosition.column
		});	
       
	}
	else {
      if(variablesTable){
		if(variablesTable.find(identify => { identify.value === compiledCodePosition.value })){
			semanticErrors.push({ 
				token: compiledCodePosition.token,
				error: "JA EXISTE UM IDENTIFICADOR COM ESSE NOME",
				line: compiledCodePosition.line,
				column: compiledCodePosition.column,
			});
		}else setVariablesTable([...variablesTable, compiledCodePosition]);
     }else setVariablesTable([...variablesTable, compiledCodePosition]);
    } 

}