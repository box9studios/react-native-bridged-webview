export const decodeMessage = event => {
  try {
    return JSON.parse(event.nativeEvent.data);
  } catch (error) {
    return {};
  }
};

export const encodeMessage = (id, data) => {
  try {
    return JSON.stringify({ id, data });
  } catch (error) {}
};

export const getInjectedCode = blocks => blocks
  .map(block => `(${block})();`)
  .join('');