export default () => {

  const listeners = {};

  document.addEventListener(
    'message',
    event => {
      const { data, id } = JSON.parse(event.data);
      const resolve = listeners[id];
      if (!resolve) {
        return;
      }
      delete listeners[id];
      resolve(data);
    },
  );

  window.device = (type, payload) => new Promise(resolve => {
    const id = Math.random();
    listeners[id] = resolve;
    window.postMessage(JSON.stringify({
      id,
      payload,
      type,
    }));
  });
};