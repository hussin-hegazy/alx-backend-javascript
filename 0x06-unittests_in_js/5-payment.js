const Utils = require('./utils');

const sendPaymentRequestToApi = (amount, shipping) => {
  const total = Utils.calculateNumber('SUM', amount, shipping);
  console.log(`The total is: ${total}`);
};

module.exports = sendPaymentRequestToApi;
