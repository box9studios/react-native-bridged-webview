export default (() => {
  if (/\(iP/.test(window.navigator.userAgent)) {
    return 'ios';
  }
  return 'android';
})();