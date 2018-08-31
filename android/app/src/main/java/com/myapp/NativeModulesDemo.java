package com.myapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ViewManager;
import com.myapp.ExitApp;
import com.myapp.HttpCacheModule;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by duansailong on 2018/5/31.
 */

public class NativeModulesDemo implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ExitApp(reactContext));
        modules.add(new HttpCacheModule(reactContext));
        return modules;
    }
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();

    }


}
