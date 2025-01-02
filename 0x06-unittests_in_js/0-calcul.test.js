const assert = require('assert');
const performCalculation = require('./0-calcul');

describe('performCalculation', () => {
  it('whole numbers with decimals', () => {
    assert.strictEqual(performCalculation('ADD', 1.0, 2.0), 3);
  });

  it('rounding down the fractional part of the second number', () => {
    assert.strictEqual(performCalculation('ADD', 1.0, 2.4), 3);
  });

  it('rounding down both numbers with fractional parts', () => {
    assert.strictEqual(performCalculation('ADD', 1.4, 2.4), 3);
  });

  it('rounding down the first number with a fractional part', () => {
    assert.strictEqual(performCalculation('ADD', 1.4, 2.0), 3);
  });

  it('rounding up the second number with a fractional part', () => {
    assert.strictEqual(performCalculation('ADD', 1.0, 2.5), 4);
  });

  it('rounding up both numbers with fractional parts', () => {
    assert.strictEqual(performCalculation('ADD', 2.6, 2.5), 6);
  });

  it('rounding up the first number with a fractional part', () => {
    assert.strictEqual(performCalculation('ADD', 2.6, 2.0), 5);
  });

  it('rounding down both numbers with fractional parts and trailing 9\'s', () => {
    assert.strictEqual(performCalculation('ADD', 2.499999, 3.499999), 5);
  });
});
