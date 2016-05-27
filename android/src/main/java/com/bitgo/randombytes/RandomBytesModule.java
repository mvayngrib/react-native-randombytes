package com.bitgo.randombytes;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.security.SecureRandom;

import android.util.Base64;

class RandomBytesModule extends ReactContextBaseJavaModule {

  public RandomBytesModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "RNRandomBytes";
  }
  @ReactMethod
  public void randomBytes(int size, Callback success) {
    SecureRandom sr = new SecureRandom();
    byte[] output = new byte[size];
    sr.nextBytes(output);
    String string = Base64.encodeToString(output, Base64.DEFAULT);
    success.invoke(null, string);
  }
}
