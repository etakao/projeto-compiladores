import { checkIdentifierType } from "./checkIdentifierType";
import { checkIdentifierValue } from "./checkIdentifierValue";

export function checkExpressionType(index, compiledCode, variablesTable, generatedCode, dataTable) {
  // true;
  let leftType = "";
  let leftValue = "";
  let rightType = "";
  let rightValue = "";
  let leftIndex = index;
  let relationType = index + 1;
  let rightIndex = index + 2;

  let boolRelations = ['EQUAL', 'DIFFERENT', 'SMALLER', 'SMALLER_OR_EQUAL', 'BIGGER_OR_EQUAL','BIGGER'];
  let intRelations = ['MINUS', 'SUM', 'DIVIDE', 'MULTIPLY'];

  if (compiledCode[leftIndex].token === "IDENTIFIER") {
    leftType = checkIdentifierType(leftIndex, compiledCode, variablesTable);
    leftValue = parseInt(checkIdentifierValue(leftIndex, compiledCode, variablesTable), 10);
  } else {
    if (compiledCode[leftIndex].token === "NUM") {
      leftType = "INT";
      leftValue = parseInt(compiledCode[leftIndex].value, 10);
      console.log("expressionValueLog",parseInt(compiledCode[leftIndex].value, 10))
    }

    if (compiledCode[leftIndex].token === "TRUE" || compiledCode[leftIndex].token === "FALSE") {
      leftType = "BOOL";
      leftValue = compiledCode[leftIndex].value;
    }

    // if (leftValue) {
    //   generatedCode.push({
    //     line: generatedCode.length,
    //     code: `CRCT ${leftValue}`
    //   })
    // }
  }

  if (compiledCode[relationType].token === "SEMICOLON" || compiledCode[relationType].token === "CLOSE_PARENTHESIS") {
    return {
      expressionType: leftType,
      expressionValue: leftValue
    }
  } else if (compiledCode[rightIndex].token === "IDENTIFIER") {
    rightType = checkIdentifierType(rightIndex, compiledCode, variablesTable);
    rightValue = parseInt(checkIdentifierValue(rightIndex, compiledCode, variablesTable), 10);
  } else {
    if (compiledCode[rightIndex].token === "NUM") {
      rightType = "INT";
      rightValue = parseInt(compiledCode[rightIndex].value, 10);
    }

    if (compiledCode[rightIndex].token === "TRUE" || compiledCode[rightIndex].token === "FALSE") {
      rightType = "BOOL";
      rightValue = compiledCode[rightIndex].value;
    }

    // if (rightValue) {
    //   generatedCode.push({
    //     line: generatedCode.length,
    //     code: `CRCT ${rightValue}`
    //   })
    // }
  }

  if (boolRelations.includes(compiledCode[relationType].token)) {
    if (leftType === rightType && rightType !== "BOOL") {
      if (leftType === "INT") {
        switch (compiledCode[relationType].token) {
          case "EQUAL":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMIG"
            // }) 
            if (leftValue == rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;

          case "DIFERENT":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMDG"
            // }) 
            if (leftValue !== rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;

          case "SMALLER":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMME"
            // }) 
            if (leftValue < rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;

          case "SMALLER_OR_EQUAL":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMEG"
            // }) 
            if (leftValue <= rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;

          case "BIGGER_OR_EQUAL":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMAG"
            // }) 
            if (leftValue >= rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;

          case "BIGGER":
            // generatedCode.push({
            //   line: generatedCode.length,
            //   code: "CMMA"
            // }) 
            if (leftValue > rightValue) return {
              expressionType: "BOOL",
              expressionValue: true
            }
            else return {
              expressionType: "BOOL",
              expressionValue: false
            }
            break;
        
          default:
            break;
        }
      }
    }
  } else if (intRelations.includes(compiledCode[relationType].token)) {
    if (leftType === "INT" && rightType === "INT") {
      switch (compiledCode[relationType].token) {
        case "MINUS":
          // generatedCode.push({
          //   line: generatedCode.length,
          //   code: "SUBT"
          // }) 
          return {
            expressionType: "INT", 
            expressionValue: leftValue - rightValue
          };
          break;

        case "SUM":
          // generatedCode.push({
          //   line: generatedCode.length,
          //   code: "SOMA"
          // }) 
          return {
            expressionType: "INT", 
            expressionValue: leftValue + rightValue
          };
          break;

        case "DIVIDE":
          // generatedCode.push({
          //   line: generatedCode.length,
          //   code: "DIVI"
          // }) 
          return {
            expressionType: "INT", 
            expressionValue: leftValue / rightValue
          };
          break;

        case "MULTIPLY":
          // generatedCode.push({
          //   line: generatedCode.length,
          //   code: "MULT"
          // }) 
          return {
            expressionType: "INT", 
            expressionValue: leftValue * rightValue
          };
          break;
      
        default:
          break;
      }
    }
  }

  // return undefined;
}