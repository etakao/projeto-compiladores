export function addVariableData(index, compiledCode, expressionValue, variablesTable) {
  let identifierToFind = compiledCode[index].value;
  console.log("addVariableDataLog", expressionValue)
  
  for (let index = 0; index < variablesTable.length; index++) {
    if (identifierToFind == variablesTable[index].value){
      variablesTable[index] = {
        ...variablesTable[index],
        data: expressionValue
      }
      console.log("variablesTableLog", variablesTable[index])
    }
  }
}