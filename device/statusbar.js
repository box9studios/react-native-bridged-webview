import platform from './platform';

export default (() => {
  if (platform === 'ios') {
    const ratio = window.devicePixelRatio || 1;
    const width = window.screen.width * ratio;
    const height = window.screen.height * ratio;
    if (
      (width === 1125 && height === 2436)
      ||
      (width === 2436 && height === 1125)
    ) {
      return 44;
    }
    return 20;
  }
  return 34;
})();