# React Native Bridged Webview
Provides a component ```<BridgedWebView />``` to faciliate communication between javscript within a webpage and the external react-native logic. The nested webpage will also receive the benefit of no-delay clicks and default mobile-friendly styling.

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
    const { delay } = payload;
    return new Promise(resolve => setTimeout(() => resolve('done!'), delay));
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