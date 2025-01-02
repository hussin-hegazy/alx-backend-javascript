function calculateNumber(operation, num1, num2) {
  const roundedNum1 = Math.round(num1);
  const roundedNum2 = Math.round(num2);

  switch (operation) {
    case 'SUM':
      return roundedNum1 + roundedNum2;
    case 'SUBTRACT':
      return roundedNum1 - roundedNum2;
    case 'DIVIDE':
      return roundedNum2 === 0 ? 'Error' : roundedNum1 / roundedNum2;
    default:
      return 0;
  }
}

module.exports = calculateNumber;
