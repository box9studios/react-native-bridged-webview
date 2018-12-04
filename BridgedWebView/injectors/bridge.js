export default () => {

  const listeners = {};

  document.addEventListener(
    'message',
    event => {
      const { data, error, id } = JSON.parse(event.data);
      const entry = listeners[id];
      if (!entry) {
        return;
      }
      delete listeners[id];
      const { reject, resolve } = entry;
      if (error) {
        reject(new Error(error));
      } else {
        resolve(data);
      }
    },
  );

  window.__REACT_NATIVE_BRIDGED_WEBVIEW__ = (type, payload) =>
    new Promise((resolve, reject) => {
      const id = Math.random();
      listeners[id] = { reject, resolve };
      window.postMessage(JSON.stringify({
        id,
        payload,
        type,
      }));
    });

  const event = document.createEvent('Events');
  event.initEvent('bridgedwebview', true, false);
  window.dispatchEvent(event);
};