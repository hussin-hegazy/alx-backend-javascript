const fetchPaymentToken = (isSuccessful) => new Promise((resolve, reject) => {
  if (isSuccessful) {
    resolve({data: 'Successful response from the API'});
  } else {
    reject(new Error('Request failed'));
  }
});

module.exports = fetchPaymentToken;
