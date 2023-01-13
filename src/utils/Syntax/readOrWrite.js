export function readOrWrite(line, columnIndex, lineNumber, identifiers){
    errors=[]; /*{ token: string, error: string, line: number, column: number }*/ 
  
    let lineIndex = 0;
        if(line[lineIndex].token !== 'OPEN_PARENTHESES'){
            errors.push({ 
                token: line[lineIndex].token,
                error: "DEVERIA SER UM ABRE PARENTESES",
                line: lineNumber,
                column: columnIndex + lineIndex + 1
            });
            
        }
        lineIndex++;
        while (lineIndex !== line[(line.length)-2]){
            if ((lineIndex % 2) != 0){
                if(line[lineIndex].token !== 'IDENTIFIER'){
                    errors.push({ 
                        token: line[lineIndex].token,
                        error: "DEVERIA SER UM IDENTIFICADOR",
                        line: lineNumber,
                        column: columnIndex + lineIndex + 1
                    });
                } else {
                    if(line[lineIndex].token !== 'COMMA'){
                        errors.push({ 
                            token: line[lineIndex].token,
                            error: "DEVERIA SER UMA VÍRGULA",
                            line: lineNumber,
                            column: columnIndex + lineIndex + 1
                        });
                    }   
                }
            }
            lineIndex++;
        }
        if(line[(line.length)-2].token !== 'CLOSE_PARENTHESIS'){
            errors.push({ 
                token: line[lineIndex].token,
                error: "DEVERIA SER UM FECHA PARENTESES",
                line: lineNumber,
                column: columnIndex + lineIndex + 1
            });
        }
        lineIndex++;
        if(line[(line.length)-1].token !== 'SEMICOLON'){
            errors.push({ 
                token: line[lineIndex].token,
                error: "DEVERIA SER UM PONTO E VIRGULA",
                line: lineNumber,
                column: columnIndex + lineIndex
            });
        }
      (!errors? console.log('passou sem erro'): console.log(errors));
      return errors;
  }