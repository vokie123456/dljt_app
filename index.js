import { AppRegistry } from 'react-native';
import './app/Common/SetTheme'
import './app/Common/Global'
import App from './App';

// 这里有个小技巧可以在发布时屏蔽掉所有的console.*调用。React Native 中有一个全局变量__DEV__用于指示当前运行环境是否是开发环境。我们可以据此在正式环境中替换掉系统原先的 console 实现。

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
AppRegistry.registerComponent('MyApp', () => App);
