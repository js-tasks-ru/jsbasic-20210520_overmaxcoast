function isEmpty(obj) {
  let indicateProps;
  
  for (let k in obj) {
    indicateProps = true;
  }
  
  return !indicateProps;
}
