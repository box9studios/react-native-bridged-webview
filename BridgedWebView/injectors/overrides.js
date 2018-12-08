export default () => {
  window.alert = value =>
    window.__REACT_NATIVE_BRIDGED_WEBVIEW__('__alert__', value);

  window.console.log = (...args) =>
    window.__REACT_NATIVE_BRIDGED_WEBVIEW__('__log__', args);
};