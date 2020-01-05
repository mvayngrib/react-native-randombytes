# react-native-randombytes

## Usage

```js
import { randomBytes } from 'react-native-randombytes'

// synchronous API
// uses SJCL
const rand = randomBytes(4)

// asynchronous API
// uses iOS-side SecRandomCopyBytes
randomBytes(4, (err, bytes) => {
  // bytes is a Buffer object
  console.log(bytes.toString('hex'))
})
```

## Installation

1. Follow the steps in the next section
1. You have two options depending on your needs:
    1. if you're trying to get Node.js or browser crypto modules working in React Native, follow the installation workflow in [react-native-crypto](https://github.com/tradle/react-native-crypto).
    1. if you only need asynchronous random bytes generation, and don't care about getting back `Buffer` objects, you can do the following:

    ```js
    import { NativeModules } from 'react-native'
    const { RNRandomBytes } = NativeModules
    RNRandomBytes.randomBytes(32, (err, bytes) => {
      // bytes is a base64string
    })
    ```

### Automatic - Android / iOS (recommended)

```bash
react-native link
```

### Manual

If Automatic installation failed you, dry your tears and read on.

#### `iOS`

* Drag RNRandomBytes.xcodeproj from node_modules/react-native-randombytes into your XCode project.

* Click on the project in XCode, go to Build Phases, then Link Binary With Libraries and add `libRNRandomBytes.a`

Confused? See an example with screenshots [here](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)


#### `Android`

* Update Gradle Settings

```gradle
// file: android/settings.gradle
...

include ':randombytes', ':app'
project(':randombytes').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-randombytes/android')
```

* Update Gradle Build

```gradle
// file: android/app/build.gradle
...

dependencies {
    ...
    compile project(':randombytes')
}
```

* Register React Package

```java
...
import com.bitgo.randombytes.RandomBytesPackage // import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new RandomBytesPackage()) // register package here
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, "AwesomeProject", null);
        setContentView(mReactRootView);
    }
...

```

### `Windows`
 

```bash
react-native link react-native-randombytes
```

Depending on your project versions and the state of RN-Windows this may not always work. If it does not, a manual installation guide can be found here:

https://github.com/Microsoft/react-native-windows/blob/master/docs/LinkingLibrariesWindows.md

