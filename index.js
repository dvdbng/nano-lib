const blake2b = require('blakejs/blake2b');
const base32 = require('base-x')('13456789abcdefghijkmnopqrstuwxyz');
const nacl = require('tweetnacl-blake2b');

function toHex (uint8arr) {
  return Array.from(uint8arr).map(function(x) {
    return ('0' + x.toString(16)).substr(-2)
  }).join('');
}

function encodeAccountNumber (index) {
  return new Uint8Array([
    (index >> 24) & 0xFF,
    (index >> 16) & 0xFF,
    (index >> 8) & 0xFF,
    index & 0xFF,
  ])
}

function seedToSecretKey (seed, index) {
  var context = blake2b.blake2bInit(32);
  blake2b.blake2bUpdate(context, seed);
  blake2b.blake2bUpdate(context, encodeAccountNumber(index || 0));
  return blake2b.blake2bFinal(context);
}

function secretKeyToKeyPair (secretKey) {
  return nacl.sign.keyPair.fromSeed(secretKey);
}

function publicKeyToAddress (publicKey) {
  var padded = new Uint8Array(35);
  padded.set(new Uint8Array(publicKey), 3);
  return (
    'xrb_' +
    base32.encode(padded).substr(-52) +
    base32.encode(blake2b.blake2b(publicKey, null, 5).reverse())
  );
}

module.exports = function generateAddress (seed, accountNumber) {
  const secret = seedToSecretKey(seed, accountNumber);
  const address = publicKeyToAddress(secretKeyToKeyPair(secret).publicKey);

  return { secret: toHex(secret), address: address };
};
