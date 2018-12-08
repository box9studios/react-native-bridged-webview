export default () => {
  window.addEventListener(
    'focus',
    event => {
      const target = event.target;
      const tag = target.nodeName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        return;
      }
      const color = window.getComputedStyle(target).color;
      target.style.caretColor = color;
      target.style.WebkitCaretColor = color;
    },
    true,
  );
};