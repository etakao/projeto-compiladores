export function identifier(line, columnIndex, lineNumber, identifiers) {
 // console.log("funcao identifierDeclaration: ", line);
 const errors = [];

 for (let index = 0; index < line.length; index++) {
   if (index % 2 === 0) {
     // console.log(index);
     if (line[index].token !== "IDENTIFIER") {
       errors.push({ 
         token: line[index].token,
         error: "DEVERIA SER UM IDENTIFICADOR",
         line: lineNumber,
         column: columnIndex + index + 1
       });
     } else {
       identifiers.push(line[index]);
     }
   } else {
     if (line[index].token === "SEMICOLON") {
       // console.log("errors: ", errors)
       columnIndex = columnIndex + index;
       return errors;
     }
     
     if (line[index].token !== "COMMA") {
       errors.push({ 
         token: line[index].token,
         error: "DEVERIA SER UMA VIRGULA",
         line: lineNumber,
         column: columnIndex + index + 1
       });
     }
   }
 }

 errors.push({ 
   error: "DEVERIA SER UM PONTO E VIRGULA",
   line: lineNumber,
   column: columnIndex + line.length + 1
 });

 // console.log("errors: ", errors)

 return errors;
}