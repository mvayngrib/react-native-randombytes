if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

var sjcl = require('sjcl');
var sjclRandom = new sjcl.prng(10);

var explicitReq = require;
var RNRandomBytes = explicitReq('react-native').NativeModules.RNRandomBytes;

var randomBytes = function(length, cb) {

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

var seedStanford = function(){
  randomBytes(4096, function(err, buffer){
    var hexString = buffer.toString('hex');
    var stanfordSeed = sjcl.codec.hex.toBits(hexString);
    sjclRandom.addEntropy(stanfordSeed);
  });
};

module.exports = {
  randomBytes: randomBytes,
  seedStanford: seedStanford
};
