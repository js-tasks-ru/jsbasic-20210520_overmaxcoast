function camelize(str) {
  return str
    .split('')
    .map( (item, i, arr) => item === '-' ? ( arr.splice(i, 1), arr[i].toUpperCase() ) : item )
    .join('');
}
