# react-native-randombytes

## Usage

```js
import { randomBytes } from 'react-native-randombytes'

// synchronous API
// uses Stanford Javascript Crypto Library (SJCL)
const rand = randomBytes(4)

// asynchronous API
// uses iOS-side SecRandomCopyBytes
randomBytes(4, (err, bytes) => {
  console.log(bytes.toString('hex'))
})
```

## Installation

```sh
npm i -S react-native-randombytes
react-native link react-native-randombytes
# Android: check MainApplication.java to verify the package was added.
```

If you only need asynchronous `randomBytes`, you're done. Otherwise, read on, dear reader.

If you're having trouble linking the library, see the React Native docs on Linking Libraries:
- iOS: https://facebook.github.io/react-native/docs/linking-libraries-ios.html

### Synchronous Usage Support

1. Install the [Stanford Javascript Crypto Library](https://bitwiseshiftleft.github.io/sjcl): `npm i -S sjcl@~1.0`
2. Follow the installation workflow outlined in [react-native-crypto](https://github.com/tradle/react-native-crypto)
