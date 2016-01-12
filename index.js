if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

var sjcl = require('sjcl');
var sjclRandom = new sjcl.prng(10);

var RNRandomBytes = require('react-native').NativeModules.RNRandomBytes;

module.exports.randomBytes = function(length, cb) {

  if (!cb) {
    var size = length;
    var wordCount = Math.ceil(size * 0.25);
    var randomBytes = sjclRandom.randomWords(wordCount);
    var hexString = sjcl.codec.hex.fromBits(randomBytes);
    hexString = hexString.substr(0, size * 2);

    return new Buffer(hexString, 'hex');
  }

  RNRandomBytes.randomBytes(length, function(err, base64String) {
    if (err) {
      cb(err);
    } else {
      cb(null, new Buffer(base64String, 'base64'));
    }
  });

};

module.exports.randomBytes(4096, function(err, buffer) {
  var hexString = buffer.toString('hex');
  sjclRandom.addEntropy(hexString, 10, 'csprng');
});
