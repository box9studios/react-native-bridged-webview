let queue = [];

const call = (type, payload) => {
  const bridge = window.__REACT_NATIVE_BRIDGED_WEBVIEW__;
  if (!bridge) {
    document.body.innerHTML = 'tried to call, but stored...';
    queue.push(() => call(type, payload));
  } else {
    document.body.innerHTML = 'CALLED IT';
    bridge(`__${type}__`, payload);
  }
};

window.addEventListener(
  'bridgedwebview',
  () => {
    queue.forEach(fn => fn());
    queue = [];
  },
);

const device = call;
device.statusbar = 100;
device.alert = text => call('alert', text);
device.log = (...args) => call('log', args);

export default device;