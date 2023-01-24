import { checkIdentifierType } from "./checkIdentifierType";

export function checkExpressionType(index, compiledCode, variablesTable) {
  // true;
  let leftType = "";
  let rightType = "";
  let leftIndex = index;
  let relationType = index + 1;
  let rightIndex = index + 2;

  let boolRelations = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  let intRelations = ['MINUS', 'SUM', 'DIVIDE', 'MULTIPLY'];

  if (compiledCode[leftIndex].token === "IDENTIFIER") {
    leftType = checkIdentifierType(leftIndex, compiledCode, variablesTable);
  } else {
    if (compiledCode[leftIndex].token === "NUM") {
      leftType = "INT";
    }

    if (compiledCode[leftIndex].token === "TRUE" || compiledCode[leftIndex].token === "FALSE") {
      leftType = "BOOL";
    }
  }

  if (compiledCode[relationType].token === "SEMICOLON" || compiledCode[relationType].token === "CLOSE_PARENTHESIS") {
    return leftType;
  } else if (compiledCode[rightIndex].token === "IDENTIFIER") {
    rightType = checkIdentifierType(rightIndex, compiledCode, variablesTable);
  } else {
    if (compiledCode[rightIndex].token === "NUM") {
      rightType = "INT";
    }

    if (compiledCode[rightIndex].token === "TRUE" || compiledCode[rightIndex].token === "FALSE") {
      rightType = "BOOL";
    }
  }

  if (boolRelations.includes(compiledCode[relationType].token)) {
    if (leftType === rightType && rightType !== "BOOL") {
      return "BOOL"
    }
  } else if (intRelations.includes(compiledCode[relationType].token)) {
    if (leftType === "INT" && rightType === "INT") {
      return "INT";
    }
  }

  return undefined;
}