const blake2b = require('blakejs/blake2b');
const nacl = require('tweetnacl-blake2b');
const {
  hexEncode,
  base32Encode,
  base32Decode,
  encodeAccountNumber,
} = require('./encoding');

function seedToSecretKey(seed, index) {
  const context = blake2b.blake2bInit(32);
  blake2b.blake2bUpdate(context, seed);
  blake2b.blake2bUpdate(context, encodeAccountNumber(index || 0));
  return blake2b.blake2bFinal(context);
}

function secretKeyToKeyPair(secretKey) {
  return nacl.sign.keyPair.fromSeed(secretKey);
}

function reverse(arr_like) {
  return Array.prototype.reverse.call(arr_like);
}

function publicKeyToAddress(publicKey) {
  const padded = new Uint8Array(35);
  padded.set(new Uint8Array(publicKey), 3);
  return (
    'xrb_' +
    base32Encode(padded).substr(-52) +
    base32Encode(reverse(blake2b.blake2b(publicKey, null, 5)))
  );
}

function isValid(address) {
  return (
    !!address &&
    /^xrb_/.test(address) &&
    address.length === (4 + 52 + 8) &&
    address.substr(56, 8) === base32Encode(reverse(blake2b.blake2b(base32Decode('1111' + address.substr(4, 52)).slice(3), null, 5)))
  );
}

function decode(address) {
  if (!isValid(address)) throw new Error('Address is invalid');
  return base32Decode('1111' + address.substr(4, 52)).slice(3);
}

function generateAddressFromSecretKey(secret) {
  const address = publicKeyToAddress(secretKeyToKeyPair(secret).publicKey);

  return { secret: hexEncode(secret), address };
}

function generateAddress(seed, accountNumber) {
  const secret = seedToSecretKey(seed, accountNumber);
  return generateAddressFromSecretKey(secret);
}

module.exports = {
  fromSeed: generateAddress,
  fromSecretKey: generateAddressFromSecretKey,
  isValid,
  decode,
};
