export function checkIdentifierType(index, compiledCode, variablesTable) {
  let identifierToFind = compiledCode[index].value.toString();

  console.log(identifierToFind)

  let identifier = variablesTable.find(variable => {
    console.log(variable.value)
    variable.value == identifierToFind
  });

  console.log(identifier);

  if (identifier === undefined) {
    return ;
  }

  return identifier.type;
}