export default function labelsList(valueList, symptomOptions) {
  var labels = [];
  for (let index = 0; index < symptomOptions.length; index++) {
    for (let j = 0; j < valueList.length; j++) {
      if (symptomOptions[index].value === valueList[j]) {
        labels.push(symptomOptions[index].label);
      }
    }
  }
  return labels;
}
