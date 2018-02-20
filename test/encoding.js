const assert = require('assert');

const { hexEncode, hexDecode, base32Encode, base32Decode } = require('../lib/encoding');

function str2uint8(str) {
  const res = new Uint8Array(str.length);
  for (var i = 0, len = str.length; i < len; i++) {
    res[i] = str.charCodeAt(i);
  }
  return res;
}

function uint8arr2str(arr) {
  return Array.from(arr).map(x => String.fromCharCode(x)).join('');
}

describe('Encoding', () => {
  describe('#hex', () => {
    it('Passes rcf4648 test vectors', () => {
      assert.equal(hexEncode(str2uint8("")), "");
      assert.equal(hexEncode(str2uint8("f")), "66");
      assert.equal(hexEncode(str2uint8("fo")), "666f");
      assert.equal(hexEncode(str2uint8("foo")), "666f6f");
      assert.equal(hexEncode(str2uint8("foob")), "666f6f62");
      assert.equal(hexEncode(str2uint8("fooba")), "666f6f6261");
      assert.equal(hexEncode(str2uint8("foobar")), "666f6f626172");

      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("")))), "");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("f")))), "f");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("fo")))), "fo");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("foo")))), "foo");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("foob")))), "foob");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("fooba")))), "fooba");
      assert.equal(uint8arr2str(hexDecode(hexEncode(str2uint8("foobar")))), "foobar");
    });
  });

  describe('#base32', () => {
    it('Works as expected', () => {
      assert.equal(base32Encode(new Uint8Array(5)), '11111111');
      assert.equal(base32Encode(new Uint8Array(10)), '1111111111111111');
      [
        new Uint8Array(0),
        new Uint8Array(5),
        hexDecode('ffffffffff'),
        hexDecode('0102030405'),
        hexDecode('0002030400'),
        hexDecode('0000000000ffffffffff'),
        hexDecode('ffffffffff0000000000'),
      ].forEach((arr) => {
        assert.equal((arr.length / 5)*8 , base32Encode(arr).length);
        assert.equal(arr.toString(), base32Decode(base32Encode(arr)).toString());
      });
    });
  });
});

