const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('verifies console.log output and Utils.calculateNumber usage', () => {
    const consoleSpy = sinon.spy(console);
    const calculateStub = sinon.stub(Utils, 'calculateNumber');

    calculateStub.returns(10);
    sendPaymentRequestToApi(100, 20);

    expect(calculateStub.calledWith('SUM', 100, 20)).to.be.true;
    expect(calculateStub.callCount).to.equal(1);
    expect(consoleSpy.log.calledWith('The total is: 10')).to.be.true;
    expect(consoleSpy.log.callCount).to.equal(1);

    calculateStub.restore();
    consoleSpy.log.restore();
  });
});
