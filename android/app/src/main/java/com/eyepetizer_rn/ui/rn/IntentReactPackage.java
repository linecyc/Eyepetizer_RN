package com.eyepetizer_rn.ui.rn;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;

/**
 * @author by linecy.
 */
public class IntentReactPackage implements ReactPackage {

  @Override public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {

    return Collections.<NativeModule>singletonList(new IntentModule(reactContext));
  }

  @Override public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
