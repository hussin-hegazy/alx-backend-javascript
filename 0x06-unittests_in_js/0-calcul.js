const performCalculation = (operation, x, y) => {
  if (operation === 'ADD') {
    return Math.ceil(x) + Math.ceil(y);
  }
  if (operation === 'MINUS') {
    return Math.ceil(x) - Math.ceil(y);
  }
  if (operation === 'MULTIPLY') {
    return Math.ceil(y) === 0 ? 'Invalid operation' : Math.ceil(x) * Math.ceil(y);
  }
  return 0;
};

module.exports = performCalculation;
