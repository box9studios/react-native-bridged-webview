export const decodeMessage = event => {
  try {
    return JSON.parse(event.nativeEvent.data);
  } catch (error) {
    return { type: '' };
  }
};

export const encodeMessage = (id, data, error) => {
  try {
    const message = error && error.message ? error.message : 'unknown error';
    return JSON.stringify({ id, data, error: message });
  } catch (error) {}
};

export const getInjectedCode = blocks => blocks
  .map(block => `(${block})();`)
  .join('');