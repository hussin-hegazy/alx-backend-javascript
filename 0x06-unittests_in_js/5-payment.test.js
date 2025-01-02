const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let consoleMonitor;

  beforeEach(() => {
    if (!consoleMonitor) {
      consoleMonitor = sinon.spy(console);
    }
  });

  afterEach(() => {
    consoleMonitor.log.resetHistory();
  });

  it('logs the correct total for sendPaymentRequestToApi(100, 20)', () => {
    sendPaymentRequestToApi(100, 20);
    expect(consoleMonitor.log.calledWith('The total is: 120')).to.be.true;
    expect(consoleMonitor.log.calledOnce).to.be.true;
  });

  it('logs the correct total for sendPaymentRequestToApi(10, 10)', () => {
    sendPaymentRequestToApi(10, 10);
    expect(consoleMonitor.log.calledWith('The total is: 20')).to.be.true;
    expect(consoleMonitor.log.calledOnce).to.be.true;
  });
});
