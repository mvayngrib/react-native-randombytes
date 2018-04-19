import { NativeModules } from 'react-native'

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer
}

const ASYNC_WARNING = 'react-native-randombytes: only async usage is set up. See the README to set up synchronous support'
const { RNRandomBytes } = NativeModules

let sjcl

const noop = () => {}

const toBuffer = (nativeStr) => new Buffer(nativeStr, 'base64')

const getSJCL = () => {
  try {
    sjcl = require('sjcl')
  } catch (err) {
    console.error(err.stack)
    throw new Error(ASYNC_WARNING)
  }
}

const enableSynchronousMode = () => {
  if (sjcl) return

  sjcl = getSJCL()
  if (RNRandomBytes.seed) {
    let seedBuffer = toBuffer(RNRandomBytes.seed)
    addEntropy(seedBuffer)
  } else {
    seedSJCL()
  }
}

const addEntropy = (entropyBuf) => {
  let hexString = entropyBuf.toString('hex')
  let stanfordSeed = sjcl.codec.hex.toBits(hexString)
  sjcl.random.addEntropy(stanfordSeed)
}

export const seedSJCL = cb => {
  cb = cb || noop
  randomBytes(4096, (err, buffer) => {
    if (err) return cb(err)

    addEntropy(buffer)
  })
}

const randomBytesSync = length => {
  enableSynchronousMode()
  let size = length
  let wordCount = Math.ceil(size * 0.25)
  let randomBytes = sjcl.random.randomWords(wordCount, 10)
  let hexString = sjcl.codec.hex.fromBits(randomBytes)
  hexString = hexString.substr(0, size * 2)
  return new Buffer(hexString, 'hex')
}

export const randomBytes = (length, cb) => {
  if (!cb) {
    return randomBytesSync(length)
  }

  RNRandomBytes.randomBytes(length, (err, base64String) => {
    if (err) {
      cb(err)
    } else {
      cb(null, toBuffer(base64String))
    }
  })
}
