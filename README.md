# react-native-randombytes

## Usage

Note: only the asynchronous API is supported, due to the limitations of having to go over the RCTBridge, and there being no secure RNG in JavaScriptCore (Math.random is a bit of a joke in the industry)

```js
var randomBytes = require('react-native-randombytes')
randomBytes(4, (err, bytes) => {
  console.log(bytes.toString('hex'))
})
```

## Installation

### `iOS`

* Drag RNRandomBytes.xcodeproj from node_modules/react-native-randombytes into your XCode project.

* Click on the project in XCode, go to Build Phases, then Link Binary With Libraries and add `libRNRandomBytes.a`

Confused? See an example with screenshots [here](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)
