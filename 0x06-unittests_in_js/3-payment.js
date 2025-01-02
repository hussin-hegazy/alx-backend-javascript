const Utils = require('./utils');

const processPayment = (amount, shipping) => {
  const finalCost = Utils.calculateNumber('SUM', amount, shipping);
  console.log(`The total is: ${finalCost}`);
};

module.exports = processPayment;
