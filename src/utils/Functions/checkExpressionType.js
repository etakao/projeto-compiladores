import { checkIdentifierType } from "./checkIdentifierType";

export function checkExpressionType(index, compiledCode, variablesTable) {
  let leftType = "";
  let rightType = "";
  let leftIndex = index;
  let rightIndex = index + 2;

  if (compiledCode[leftIndex].token === "IDENTIFIER") {
    leftType = checkIdentifierType(compiledCode, leftIndex, variablesTable);
  } else {
    if (compiledCode[leftIndex].token === "NUM") {
      leftType = "INT";
    }

    if (compiledCode[leftIndex].token === "TRUE" || compiledCode[leftIndex].token === "FALSE") {
      leftType = "BOOL";
    }
  }

  if (compiledCode[rightIndex].token === "IDENTIFIER") {
    rightType = checkIdentifierType(compiledCode, rightIndex, variablesTable);
  } else {
    if (compiledCode[rightIndex].token === "NUM") {
      rightType = "INT";
    }

    if (compiledCode[leftIndex].token === "TRUE" || compiledCode[leftIndex].token === "FALSE") {
      rightType = "BOOL";
    }
  }

  if (leftType === rightType) {
    return leftType;
  } else return false;
}