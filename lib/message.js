const blake2b = require('blakejs/blake2b');
const nacl = require('tweetnacl-blake2b');
const { decode } = require('./address')
const { hexEncode, hexDecode } = require('./encoding')
const MAGIC_STRING = 'Nano Signed Message:\n';

function msgHash (msg) {
  return blake2b.blake2b(MAGIC_STRING + msg, null, 32);
}

function sign(message, secretKey) {
  const key = nacl.sign.keyPair.fromSeed(hexDecode(secretKey)).secretKey;
  return hexEncode(nacl.sign.detached(msgHash(message), key));
}

function verify (message, signature, address) {
  const pubKey = decode(address);
  return nacl.sign.detached.verify(msgHash(message), hexDecode(signature), pubKey);
}

module.exports = { sign, verify };
