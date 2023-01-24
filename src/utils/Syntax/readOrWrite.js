export function readOrWrite(firstPosition, compiledCode, variablesTable, syntaxErrors, semanticErrors){
    let lastPosition = firstPosition + 1; 

    if(compiledCode[lastPosition].token !== 'OPEN_PARENTHESES'){
        syntaxErrors.push({ 
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
                syntaxErrors.push({ 
                    token: compiledCode[lastPosition].token,
                    error: "DEVERIA SER UM IDENTIFICADOR",
                    line: compiledCode[lastPosition].line ,
                    column: compiledCode[lastPosition].column
                });
            } else {
                if(compiledCode[lastPosition].token !== 'COMMA'){
                    syntaxErrors.push({ 
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
        syntaxErrors.push({ 
            token: compiledCode[lastPosition].token,
            error: "DEVERIA SER UM FECHA PARENTESES",
            line: compiledCode[lastPosition].line ,
            column: compiledCode[lastPosition].column
        });
    }
    lastPosition++;
    if(compiledCode[(line.length)-1].token !== 'SEMICOLON'){
        syntaxErrors.push({ 
            token: compiledCode[lastPosition].token,
            error: "DEVERIA SER UM PONTO E VIRGULA",
            line: compiledCode[lastPosition].line ,
            column: compiledCode[lastPosition].column
        });
    }
(!syntaxErrors? console.log('passou sem erro'): console.log(errors));

return lastPosition;
}