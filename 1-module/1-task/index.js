function factorial(n) {	
  let result = n;

  if (n == 0 || n == 1) {
    result = 1;
  } else {

    while (n > 1) {
      result *= --n;
    }
  }

  return result;
}
