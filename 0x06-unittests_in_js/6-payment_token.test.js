const { expect } = require('chai');
const fetchPaymentToken = require('./6-payment_token');

describe('fetchPaymentToken', () => {
  it('should resolve with the correct data when success is true', (done) => {
    fetchPaymentToken(true)
      .then((response) => {
        expect(response).to.deep.equal({data: 'Successful response from the API'});
        done();
      })
      .catch(done);
  });

  it('should reject with an error when success is false', (done) => {
    fetchPaymentToken(false)
      .catch((error) => {
        expect(error).to.be.an('error');
        done();
      });
  });
});
