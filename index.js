if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer
}

var deasync = require('deasync');

var {
RNRandomBytes
} = require('react-native').NativeModules;

export default function randomBytes(length, cb) {
  if (!cb) {
    // throw new Error('synchronous API not supported')
    var exec = deasync(RNRandomBytes.randomBytes);
    var base64String = exec(length);
    return new Buffer(base64String, 'base64');
  }

  RNRandomBytes.randomBytes(length, function(err, base64String) {
    if (err) cb(err)
    else cb(null, new Buffer(base64String, 'base64'))
  })
}
