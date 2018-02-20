const assert = require('assert');

const nanoJS = require('..');

describe('addresses', () => {

  it('Can generate an address from seed + account number', () => {
    const seed = nanoJS.encoding.hexDecode('0000000000000000000000000000000000000000000000000000000000000000');
    const accountNumber = 0;

    assert.deepStrictEqual(
      nanoJS.address.fromSeed(seed, accountNumber),
      {
        secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
        address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7'
      }
    );
  });

  it('Can generate an address from secret key', () => {
    const secretKey = nanoJS.encoding.hexDecode('9F0E444C69F77A49BD0BE89DB92C38FE713E0963165CCA12FAF5712D7657120F');

    assert.deepStrictEqual(
      nanoJS.address.fromSecretKey(secretKey),
      {
        secret: '9f0e444c69f77a49bd0be89db92c38fe713e0963165cca12faf5712d7657120f',
        address: 'xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7'
      }
    );
  });

  it('Can know if an address is valid', () => {
    assert.strictEqual(nanoJS.address.isValid('xrb_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7'), true);
    assert.strictEqual(nanoJS.address.isValid('xrb_3g185cma1kqoaxeosmnrr5y8z6gmaeh11zz3h5t1fcrkp9xwmyyg67upfwmx'), true);
    assert.strictEqual(nanoJS.address.isValid('xrb_3g185cma1kqoaxeosmnrr5y8z6gmaeh11zz3h5t1fcrkp9xwmyyg67upfwmy'), false);
    assert.strictEqual(nanoJS.address.isValid('xrb_3g185cma1kqoaxeosmnrr5y9z6gmaeh11zz3h5t1fcrkp9xwmyyg67upfwmx'), false);
    assert.strictEqual(nanoJS.address.isValid('xrb_3g185cma1kqoaxeosmnrr5y9z6gmaeh11zz3h5t1fcrkp9xwmyyg67upfwm'), false);
    assert.strictEqual(nanoJS.address.isValid(''), false);
    assert.strictEqual(nanoJS.address.isValid(null), false);
    assert.strictEqual(nanoJS.address.isValid(true), false);
    assert.strictEqual(nanoJS.address.isValid(false), false);
  });

});
