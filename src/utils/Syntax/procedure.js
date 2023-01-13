export function procedure(line, columnIndex, lineNumber, identifiers){
    if(line[0].token !== 'IDENTIFIER'){
        errors.push({ 
            token: line[lineIndex].token,
            error: "DEVERI",
            line: lineNumber,
            column: columnIndex + lineIndex + 1
        });
}
}

// [[program,{token:program},correto, ;],[int a,, b,, c,,,],[begin,->Sintaxy,end,error]]