const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const processPayment = require('./3-payment');

describe('processPayment', () => {
  it('should invoke Utils.calculateNumber with correct arguments', () => {
    const utilsSpy = sinon.spy(Utils);

    processPayment(100, 20);
    expect(utilsSpy.calculateNumber.calledOnceWithExactly('SUM', 100, 20)).to.be.true;
    expect(utilsSpy.calculateNumber.callCount).to.equal(1);
    utilsSpy.calculateNumber.restore();
  });
});
