export default () => {
  const meta1 = document.createElement('meta');
  meta1.setAttribute('charset', 'utf-8');
  document.head.appendChild(meta1);
  const meta2 = document.createElement('meta');
  meta2.setAttribute('name', 'viewport');
  meta2.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0');
  document.head.appendChild(meta2);
};