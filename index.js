if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

var sjcl = require('sjcl');

var explicitReq = require;
var RNRandomBytes = explicitReq('react-native').NativeModules.RNRandomBytes;

var randomBytes = function(length, cb) {

  if (!cb) {
    var size = length;
    var wordCount = Math.ceil(size * 0.25);
    console.log('SEED LEVEL: '+sjcl.random.getProgress(10));
    var randomBytes = sjcl.random.randomWords(wordCount, 10);
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

var seedSJCL = function(currentSJCL){
  randomBytes(4096, function(err, buffer){
    var hexString = buffer.toString('hex');
    var stanfordSeed = currentSJCL.codec.hex.toBits(hexString);
    currentSJCL.random.addEntropy(stanfordSeed);
  });
};

// initialize the seed
seedSJCL(sjcl);

module.exports = {
  randomBytes: randomBytes,
  seedSJCL: seedSJCL
};
