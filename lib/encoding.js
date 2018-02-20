const BASE_32 = '13456789abcdefghijkmnopqrstuwxyz'
const BASE_32_INV = (function(){
  const out = {};
  for (var i = 0, len = BASE_32.length; i < len; i++) {
    out[BASE_32[i]] = i;
  }
  return out;
})();

function hexEncode (uint8arr) {
  return Array.from(uint8arr).map(function(x) {
    return ('0' + x.toString(16)).substr(-2)
  }).join('');
}

function hexDecode (hexString) {
  if ((hexString.length % 2) !== 0) throw new Error('can only decode whole bytes');
  if (/[^0-9a-f]/ig.test(hexString)) throw new Error('invalid hex string');
  const out = new Uint8Array(hexString.length / 2);
  for (var i = 0, len = out.length; i < len; i++) {
    out[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return out;
}

function encodeAccountNumber (index) {
  return new Uint8Array([
    (index >> 24) & 0xFF,
    (index >> 16) & 0xFF,
    (index >> 8) & 0xFF,
    index & 0xFF,
  ])
}

function base32Encode(arr) {
  if ((arr.length % 5) !== 0) throw new Error('can only encode arrays where len(s)%5==0');
  const chunks = [];

  for(var o = 0, l = arr.length; o < l; o += 5) {
    chunks.push(
      BASE_32[  arr[o+0] >> 3                           ] +
      BASE_32[((arr[o+1] >> 6) | (arr[o+0] << 2)) & 0x1F] +
      BASE_32[ (arr[o+1] >> 1)                    & 0x1F] +
      BASE_32[((arr[o+2] >> 4) | (arr[o+1] << 4)) & 0x1F] +
      BASE_32[ (arr[o+3] >> 7) | (arr[o+2] << 1)  & 0x1F] +
      BASE_32[ (arr[o+3] >> 2)                    & 0x1F] +
      BASE_32[ (arr[o+4] >> 5) | (arr[o+3] << 3)  & 0x1F] +
      BASE_32[  arr[o+4]                          & 0x1F]
    )
  }

  return chunks.join('');
}

function base32Decode (str) {
  if ((str.length % 8) !== 0) throw new Error('can only encode strings where len(s)%8==0');

  const out = new Uint8Array((str.length/8)*5);
  const tmp = new Uint8Array(8);

  for(let o = 0, l = str.length; o < l; o += 8) {
    for (let i = 0; i < 8; i++) {
      tmp[i] = BASE_32_INV[str[o+i]];
    }
    const outOffset = (o/8)*5
    out[outOffset+0] = tmp[0]<<3 | tmp[1]>>2;
    out[outOffset+1] = tmp[1]<<6 | tmp[2]<<1 | tmp[3]>>4;
    out[outOffset+2] = tmp[3]<<4 | tmp[4]>>1;
    out[outOffset+3] = tmp[4]<<7 | tmp[5]<<2 | tmp[6]>>3;
    out[outOffset+4] = tmp[6]<<5 | tmp[7];
  }

  return out;
}

module.exports = {
  base32Encode: base32Encode,
  base32Decode: base32Decode,
  encodeAccountNumber: encodeAccountNumber,
  hexEncode: hexEncode,
  hexDecode: hexDecode,
}
