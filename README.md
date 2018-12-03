# React Native Bridged Webview
Provides a component ```<BridgedWebView />``` to faciliate communication between javscript within a webpage and the external react-native logic. The nested webpage will also receive the benefit of zero-delay clicks, default mobile-friendly styling, and more.

## Installation
```npm i --save react-native-bridged-webview```

## Example

```js
// App.js (react-native)
import React from 'react';
import { Alert } from 'react-native';
import BridgedWebView from 'react-native-bridged-webview';

const onBridgedWebViewCall = (type, payload) => {
  Alert.alert(`WebView sent (${type}) ${JSON.stringify(payload)}`);
  if (type === 'whoami') {
    return 'Joe';
  }
  if (type === 'makemewait') {
    return new Promise(resolve =>
      setTimeout(() => resolve('done!'), payload));
  }
};

export default () => (
  <BridgedWebView
    color="#000"
    onCall={onBridgedWebViewCall}
    source={require('./index.html')}
  />
);
```
```js
// javascript within index.html files
const doAllTheThings = async () => {
  const name = await window.device('whoami');
  await window.device('makemewait', 3000);
  alert(`Worth the wait! My name is ${name}`);
};
doAllTheThings();
```