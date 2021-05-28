function sumSalary(salaries) {
  let calcSum = 0;
  
  for (let k in salaries) { typeof(salaries[k]) == 'number' && isFinite(salaries[k]) ? calcSum += salaries[k] : null }
  
  return calcSum;
}