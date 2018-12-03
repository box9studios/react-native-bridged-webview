export default () => {
  setInterval(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (video.__BWK__) {
        return;
      }
      video.__BWK__ = true;
      video.addEventListener('webkitendfullscreen', () => {
        device('__exitFullscreen__');
      });
    });
  }, 1000);
}
