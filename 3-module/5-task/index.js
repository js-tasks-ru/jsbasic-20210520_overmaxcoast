function getMinMax(str) {
  let result = {};
  let numsOfStr = str
    .split(/[ ,]/)
    .filter(item => parseInt(item, 10))
    .map(Number)
    .sort((a, b) => a - b);
  
  result.min = numsOfStr.shift();
  result.max = numsOfStr.pop();
  
  return result;
}
