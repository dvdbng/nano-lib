const blake2b = require('blakejs/blake2b');
const nacl = require('tweetnacl-blake2b');

const BASE_32 = '13456789abcdefghijkmnopqrstuwxyz'

function toHex (uint8arr) {
  return Array.from(uint8arr).map(function(x) {
    return ('0' + x.toString(16)).substr(-2)
  }).join('');
}

function base32Encode(arr) {
  if ((arr.length % 5) !== 0) throw new Error('can only encode strings where len(s)%5==0');
  const chunks = [];

  for(var o = 0, l = arr.length; o < l; o += 5) {
    chunks.push(
      BASE_32[  arr[o  ] >> 3                           ] +
      BASE_32[((arr[o+1] >> 6) | (arr[o  ] << 2)) & 0x1F] +
      BASE_32[ (arr[o+1] >> 1)                    & 0x1F] +
      BASE_32[((arr[o+2] >> 4) | (arr[o+1] << 4)) & 0x1F] +
      BASE_32[ (arr[o+3] >> 7) | (arr[o+2] << 1)  & 0x1F] +
      BASE_32[ (arr[o+3] >> 2)                    & 0x1F] +
      BASE_32[ (arr[o+4] >> 5) | (arr[o+3] << 3)  & 0x1F] +
      BASE_32[  arr[o+4] & 0x1F                         ]
    )
  }

  return chunks.join('');
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
    base32Encode(padded).substr(-52) +
    base32Encode(blake2b.blake2b(publicKey, null, 5).reverse())
  );
}

function generateAddress (seed, accountNumber) {
  const secret = seedToSecretKey(seed, accountNumber);
  return generateAddressFromSecretKey(secret);
};

function generateAddressFromSecretKey(secret) {
  const address = publicKeyToAddress(secretKeyToKeyPair(secret).publicKey);

  return { secret: toHex(secret), address: address };
}

module.exports = {
  generateAddress: generateAddress,
  generateAddressFromPrivateKey: generateAddressFromSecretKey
};
