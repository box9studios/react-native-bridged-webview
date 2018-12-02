export default () => {
  const dispatchEvent = (target, type) => {
    const event = document.createEvent('Events');
    event.initEvent(type, true, false);
    target.dispatchEvent(event);
  };

  const onSuppressClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerClick = target => {
    window.removeEventListener('click', onSuppressClick);
    if (
      target.form
      && target.getAttribute('type') === 'submit'
      && (target.nodeName === 'BUTTON' || target.nodeName === 'INPUT')
    ) {
      dispatchEvent(target.form, 'submit');
    } else {
      dispatchEvent(target, 'click');
    }
    window.addEventListener('click', onSuppressClick);
  };

  document.body.addEventListener('touchstart', touchStartEvent => {
    const startY = touchStartEvent.touches[0].pageY;
    const startX = touchStartEvent.touches[0].pageX;
    const onDone = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchUp);
      window.removeEventListener('touchcancel', onTouchCancel);
    };
    const onTouchCancel = () => onDone();
    const onTouchMove = touchMoveEvent => {
      if (
        Math.abs(startY - touchMoveEvent.touches[0].pageY) > 3
        || Math.abs(startX - touchMoveEvent.touches[0].pageX) > 3
      ) {
        onDone();
      }
    };
    const onTouchUp = touchUpEvent => {
      onDone();
      triggerClick(touchStartEvent.touches[0].target);
    };
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);
    window.addEventListener('touchcancel', onTouchCancel);
  });
};