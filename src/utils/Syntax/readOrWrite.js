export function readOrWrite(firstPosition, compiledCode, variablesTable, setVariablesTable, syntaxErrors, setSyntaxErrors, semanticErrors, setSemanticErrors){
    let newSyntaxErrors = []; /*{ token: string, error: string, line: number, column: number }*/ 
    let lastPosition = firstPosition; 

        if(compiledCode[lastPosition].token !== 'OPEN_PARENTHESES'){
            newSyntaxErrors.push({ 
                token: compiledCode[lastPosition].token,
                error: "DEVERIA SER UM ABRE PARENTESES",
                line: compiledCode[lastPosition].line,
                column: compiledCode[lastPosition].column
            });
            
        }
        lastPosition++;
        while (lastPosition !== compiledCode[(line.length)-2]){
            if ((lastPosition % 2) != 0){
                if(compiledCode[lastPosition].token !== 'IDENTIFIER'){
                    newSyntaxErrors.push({ 
                        token: compiledCode[lastPosition].token,
                        error: "DEVERIA SER UM IDENTIFICADOR",
                        line: compiledCode[lastPosition].line ,
                        column: compiledCode[lastPosition].column
                    });
                } else {
                    if(compiledCode[lastPosition].token !== 'COMMA'){
                        newSyntaxErrors.push({ 
                            token: compiledCode[lastPosition].token,
                            error: "DEVERIA SER UMA VÍRGULA",
                            line: compiledCode[lastPosition].line ,
                            column: compiledCode[lastPosition].column
                        });
                    }   
                }
            }
            lastPosition++;
        }
        if(compiledCode[(line.length)-2].token !== 'CLOSE_PARENTHESIS'){
            newSyntaxErrors.push({ 
                token: compiledCode[lastPosition].token,
                error: "DEVERIA SER UM FECHA PARENTESES",
                line: compiledCode[lastPosition].line ,
                column: compiledCode[lastPosition].column
            });
        }
        lastPosition++;
        if(compiledCode[(line.length)-1].token !== 'SEMICOLON'){
            newSyntaxErrors.push({ 
                token: compiledCode[lastPosition].token,
                error: "DEVERIA SER UM PONTO E VIRGULA",
                line: compiledCode[lastPosition].line ,
                column: compiledCode[lastPosition].column
            });
        }
    (!newSyntaxErrors? console.log('passou sem erro'): console.log(errors));
     
    setSyntaxErrors([...syntaxErrors, ...newSyntaxErrors]);

    return lastPosition;
  }