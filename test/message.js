const assert = require('assert');

const nanoJS = require('..');

describe('message', () => {

  it('Can sign a message', () => {
    const secretKey = '8906a4f456f345080ffdcca2f3025cafeb7b15f2142d419f36f9c0eee3a64939';

    assert.strictEqual(
      nanoJS.message.sign('asd', secretKey),
      '5f96a76d974cca15b7a6eec8a6a897e1b93d705a72ac3cae658daa89072bab19600d393d5164128a16716a9f3307640e568c08fd5389a32f7a636b0a611aa40d'
    );
  });

  it('Can verify a signed message', () => {
    assert.strictEqual(
      nanoJS.message.verify(
        'asd',
        '5f96a76d974cca15b7a6eec8a6a897e1b93d705a72ac3cae658daa89072bab19600d393d5164128a16716a9f3307640e568c08fd5389a32f7a636b0a611aa40d',
        'xrb_14aepoa643kq3dwnx5b5bqgzbtnaecjjxr171jpofr3ojn6feoq9hjs9xiin',
      ),
      true,
    );
  });

  it('Sigining and verify work for a veriety of inputs', () => {
    const { address, secret } = nanoJS.address.fromSeed(new Uint8Array(0), 0);

    ['', 'hello', 'hñ{éllo', '1234', '\n'].forEach((msg) => {
      const signature = nanoJS.message.sign(msg, secret);
      assert.strictEqual(nanoJS.message.verify(msg, signature, address), true);
      assert.strictEqual(nanoJS.message.verify(msg + 'a', signature, address), false);
    });
  });
});

