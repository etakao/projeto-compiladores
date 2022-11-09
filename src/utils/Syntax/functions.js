export function identifyFunction(line, lineNumber, identifiers) {
  let errors = [];
  let lineSections = [];
  let lastSemicolonPosition = 0;

  for (let index = 0; index < line.length; index++) {
    if (line[index].token === "SEMICOLON") {
      if (lastSemicolonPosition === 0) {
        lineSections.push({
          section: line.slice(lastSemicolonPosition, index + 1),
          column: lastSemicolonPosition
        });
      } else {
        lineSections.push({
          section: line.slice(lastSemicolonPosition + 1, index + 1),
          column: lastSemicolonPosition + 1
        });
      }

      lastSemicolonPosition = index;
    }
  }

  if (lastSemicolonPosition === 0) {
    lineSections.push({
      section: line,
      column: lastSemicolonPosition
    });
  } else if (lastSemicolonPosition !== line.length - 1) {
    console.log('lastSemicolonPosition:',lastSemicolonPosition);
    lineSections.push({
      section: line.slice(lastSemicolonPosition +1, line.length - 1),
      column: lastSemicolonPosition + 1
    });
  }

  for (let sectionIndex = 0; sectionIndex < lineSections.length; sectionIndex++) {
    console.log(lineSections[sectionIndex]);
    if (lineSections[sectionIndex].section[0].token === "INT" || lineSections[sectionIndex].section[0].token === "BOOL") {
      const lineErrors = identifierDeclaration(
        lineSections[sectionIndex].section.slice(1, lineSections[sectionIndex].length), 
        lineSections[sectionIndex].column + 1, 
        lineNumber,
        identifiers
      );
        
      if (lineErrors.length) {
        errors = errors.concat(lineErrors)
      }
    } else {
      errors.push({
        token: lineSections[sectionIndex].section[0].token,
        error: "DEVERIA SER O TIPO DE VAR.",
        line: lineNumber,
        column: lineSections[sectionIndex].column + 1
      });
    }

    // if (lineSections[sectionIndex].section[lineSections[sectionIndex].length - 1].token !== "SEMICOLON") {
    //   errors.push({
    //     token: lineSections[sectionIndex].section[lineSections[sectionIndex].length - 1].token,
    //     error: "SHOULD BE SEMICOLON",
    //     line: lineNumber,
    //     column: lineSections[sectionIndex].column + lineSections[sectionIndex].section.lenght
    //   });
    // }
  }

  return errors;
}

function identifierDeclaration(line, columnIndex, lineNumber, identifiers) {
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