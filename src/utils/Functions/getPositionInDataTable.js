export function getPositionInDataTable(item, dataTable) {
  for (let dataTableIndex = 0; dataTableIndex < dataTable.length; dataTableIndex++) {
    if(item.value === dataTable[dataTableIndex].value){
        return (dataTableIndex);
    }
  }return ( undefined);
}