export default () => {
  setInterval(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (video.__BWK__) {
        return;
      }
      video.__BWK__ = true;
      video.addEventListener(
        'webkitendfullscreen',
        () => window.__REACT_NATIVE_BRIDGED_WEBVIEW__('__exitFullscreen__'),
      );
    });
  }, 1000);
};