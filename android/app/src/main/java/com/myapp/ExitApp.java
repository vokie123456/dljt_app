package com.myapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by duansailong on 2018/5/31.
 */

public class ExitApp extends ReactContextBaseJavaModule{

    public ExitApp(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ExitApp";
    }

    @ReactMethod
    public void Exit() {
        android.os.Process.killProcess(android.os.Process.myPid());
    }

}
