if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer
}

var {
  RNRandomBytes
} = require('react-native').NativeModules

export default function randomBytes (length, cb) {
  if (!cb) throw new Error('synchronous API not supported')

  RNRandomBytes.randomBytes(length, function (err, base64String) {
    if (err) cb(err)
    else cb(null, new Buffer(base64String, 'base64'))
  })
}
