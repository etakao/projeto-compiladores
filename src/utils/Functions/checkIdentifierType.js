export function checkIdentifierType(variableToCheck, variablesTable) {
  console.log(variablesTable);
  let identifier = variablesTable.find(variable => {
    console.log( variable.value);
    variable.value === variableToCheck.value;
  });

  return identifier.type;
}