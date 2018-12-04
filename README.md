# React Native Bridged Webview
The parts you need to create a react-native/webview hybrid mobile app.

## Description
Every hybrid mobile app contains three essential parts:
1) Native code that creates a WebView
2) A website that lives inside the WebView
3) A bridge that faciliates communication between these 2 components

This package provides a ```<BridgedWebView />``` component and the companion bridge mechanism to faciliate 2-way promisable-communication between a website and react-native. This allows javascript within the website to talk to the react-native code.

## Example

```js
// the main react-native entry js file
import React from 'react';
import BridgedWebView from 'react-native-bridged-webview';
import source from './index.html';

const onBridgedWebViewCall = (type, payload) => {
  switch (type) {
    case 'whoami':
      return 'Joe';
    case 'makemewait':
      return new Promise(resolve => setTimeout(resolve, payload));
  }
};

export default () => (
  <BridgedWebView
    color="#000"
    onCall={onBridgedWebViewCall}
    source={source}
  />
);
```
```js
// js somewhere within the index.html file
import call from 'react-native-bridged-webview/call';

(async () => {
  const name = await call('whoami');
  await call('makemewait', 3000);
  document.body.innerText = `Finally! My name is ${name}`;
})();
```