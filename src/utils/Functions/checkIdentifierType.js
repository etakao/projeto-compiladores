export function checkIdentifierType(index, compiledCode, variablesTable) {
  let identifierToFind = compiledCode[index].value;
  let identifier = undefined;

  for (let index = 0; index < variablesTable.length; index++) {
    if (identifierToFind == variablesTable[index].value){
      identifier = variablesTable[index]
    }
  }

  if (identifier === undefined) {
    return false;
  }

  return identifier.type;
}