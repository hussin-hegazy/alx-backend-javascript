const MathUtils = {
  computeOperation(operation, x, y) {
    if (operation === 'SUM') {
      return Math.round(x) + Math.round(y);
    }
    if (operation === 'SUBTRACT') {
      return Math.round(x) - Math.round(y);
    }
    if (operation === 'DIVIDE') {
      return Math.round(y) === 0 ? 'Error' : Math.round(x) / Math.round(y);
    }
    return 0;
  },
};

module.exports = MathUtils;
