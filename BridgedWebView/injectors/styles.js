export default () => {
  const style = document.createElement('style');
  const lines = [
    '* {',
    '  overflow-scrolling: touch;',
    '  -webkit-overflow-scrolling: touch;',
    '  tap-highlight-color: rgba(0, 0, 0, 0);',
    '  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);',
    '  text-size-adjust: none;',
    '  -webkit-text-size-adjust: none;',
    '  touch-callout: none;',
    '  -webkit-touch-callout: none;',
    '  outline: none;',
    '  -webkit-outline: none;',
    '}',
    '*:not(input):not(textarea) {',
    '  user-select: none;',
    '  -webkit-user-select: none;',
    '}',
    'html, body {',
    '  height: 100vh;',
    '  margin: 0;',
    '  width: 100vw;',
    '  overflow: hidden;',
    '}',
  ];
  style.innerText = lines.join(' ');
  document.body.appendChild(style);
};