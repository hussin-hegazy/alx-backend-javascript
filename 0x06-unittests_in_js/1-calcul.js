const calculateNumber = (operation, num1, num2) => {
  const roundedA = Math.round(num1);
  const roundedB = Math.round(num2);

  if (operation === 'SUM') {
    return roundedA + roundedB;
  } else if (operation === 'SUBTRACT') {
    return roundedA - roundedB;
  } else if (operation === 'DIVIDE') {
    return roundedB === 0 ? 'Error' : roundedA / roundedB;
  }

  return null;
};

module.exports = calculateNumber;
