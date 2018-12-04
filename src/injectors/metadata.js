export default () => {
  const meta1 = document.createElement('meta');
  meta1.setAttribute('charset', 'utf-8');
  document.head.appendChild(meta1);
  const meta2 = document.createElement('meta');
  meta2.setAttribute('name', 'viewport');
  meta2.setAttribute('content', 'width=device-width, user-scalable=no');
  document.head.appendChild(meta2);
};