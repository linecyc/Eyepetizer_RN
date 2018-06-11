package com.eyepetizer_rn.ui.rn;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * react native 有个 IntentModule，用于唤起外链？
 *
 * @author by linecy.
 */
public class IntentModule extends ReactContextBaseJavaModule {

  private static final String TAG = "IntentModule";
  private static final int REQUEST_CODE = 123;
  private static final String EXTRA_NO_FOUND = "extra_no_found";
  private static final String EXTRA_CANCEL = "extra_cancel";
  private static final String EXTRA_FAILED = "extra_failed";
  private static final String EXTRA_NO_DATA = "extra_no_data";

  private Promise promise;

  IntentModule(ReactApplicationContext reactContext) {
    super(reactContext);

    LifecycleEventListener lifecycleEventListener = new LifecycleEventListener() {
      @Override public void onHostResume() {
        Log.i(TAG, "onHostResume");
      }

      @Override public void onHostPause() {
        Log.i(TAG, "onHostPause");
      }

      @Override public void onHostDestroy() {
        Log.i(TAG, "onHostDestroy");
      }
    };

    ActivityEventListener activityEventListener = new BaseActivityEventListener() {
      @Override public void onActivityResult(Activity activity, int requestCode, int resultCode,
          Intent intent) {
        if (requestCode == REQUEST_CODE) {
          if (promise != null) {
            if (resultCode == Activity.RESULT_CANCELED) {
              promise.reject(EXTRA_CANCEL, "Request was cancelled");
            } else if (resultCode == Activity.RESULT_OK) {
              String data = intent.getStringExtra("data");
              if (null == data) {
                promise.reject(EXTRA_NO_DATA, "No data found");
              } else {
                promise.resolve(data);
              }
            }

            promise = null;
          }
        }
      }
    };
    reactContext.addLifecycleEventListener(lifecycleEventListener);
    reactContext.addActivityEventListener(activityEventListener);
  }

  @Override public String getName() {
    return "IntentModule";
  }

  @ReactMethod public void startActivityFromJS(String activityName, String params) {
    try {
      Activity activity = getCurrentActivity();
      if (activity != null) {
        Class to = Class.forName(activityName);
        Intent intent = new Intent(activity, to);
        intent.putExtra("params", params);
        activity.startActivity(intent);
      }
    } catch (Exception e) {
      throw new JSApplicationIllegalArgumentException("不能打开Activity:" + e.getMessage());
    }
  }

  @ReactMethod public void startActivityForResultFromJS(String activityName, String params,
      final Promise promise) {
    try {
      Activity activity = getCurrentActivity();
      if (activity != null) {
        this.promise = promise;
        Class to = Class.forName(activityName);
        Intent intent = new Intent(activity, to);
        intent.putExtra("params", params);
        activity.startActivityForResult(intent, REQUEST_CODE);
      } else {
        this.promise.reject(EXTRA_NO_FOUND, activityName + " is null");
        this.promise = null;
      }
    } catch (Exception e) {
      this.promise.reject(EXTRA_FAILED, e);
      this.promise = null;
      throw new JSApplicationIllegalArgumentException("不能打开Activity:" + e.getMessage());
    }
  }

  @ReactMethod public void getDataFromNative(Callback successBack, Callback errorBack) {
    try {
      Activity activity = getCurrentActivity();
      if (activity != null) {
        String result = activity.getIntent().getStringExtra("data");
        successBack.invoke(result);
      }
    } catch (Exception e) {
      errorBack.invoke(e.getMessage());
    }
  }
}
