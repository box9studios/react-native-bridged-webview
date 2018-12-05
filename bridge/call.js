let queue = [];

window.addEventListener(
  'bridgedwebview',
  () => {
    queue.forEach(fn => fn());
    queue = [];
  },
);

export default (type, payload) => {
  const bridge = window.__REACT_NATIVE_BRIDGED_WEBVIEW__;
  if (!bridge) {
    queue.push(() => call(type, payload));
    return;
  }
  bridge(type, payload);
};