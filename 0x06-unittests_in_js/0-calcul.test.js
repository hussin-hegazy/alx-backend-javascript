const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('whole numbers with floating point representation', () => {
    assert.strictEqual(calculateNumber(1.0, 2.0), 3);
  });

  it('rounding b\'s fractional value down', () => {
    assert.strictEqual(calculateNumber(1.0, 2.4), 3);
  });

  it('rounding both a and b\'s fractional values down', () => {
    assert.strictEqual(calculateNumber(1.4, 2.4), 3);
  });

  it('rounding a\'s fractional value down', () => {
    assert.strictEqual(calculateNumber(1.4, 2.0), 3);
  });

  it('rounding b\'s fractional value up', () => {
    assert.strictEqual(calculateNumber(1.0, 2.5), 4);
  });

  it('rounding both a and b\'s fractional values up', () => {
    assert.strictEqual(calculateNumber(2.6, 2.5), 6);
  });

  it('rounding a\'s fractional value up', () => {
    assert.strictEqual(calculateNumber(2.6, 2.0), 5);
  });

  it('rounding a and b with fractional values ending in 9 down', () => {
    assert.strictEqual(calculateNumber(2.499999, 3.499999), 5);
  });
});
