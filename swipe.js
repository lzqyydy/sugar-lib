function _init(target, touchCallback, moveCallback, endCallback, swipeCallback, tapCallback, _moveThreshold){
  target.addEventListener('touchstart', handleTouchStart, {passive: false});
  target.addEventListener('touchmove', handleTouchMove, {passive: false});
  target.addEventListener('touchend', handleTouchEnd, {passive: false});
  target.addEventListener('touchcancel', handleTouchEnd, {passive: false});
  target.addEventListener('mousedown', handleTouchStart, {passive: false});
  target.addEventListener('mousemove', handleTouchMove, {passive: false});
  target.addEventListener('mouseup', handleTouchEnd, {passive: false});
  target.addEventListener('mouseleave', handleTouchEnd, {passive: false});

  var moveThreshold = _moveThreshold*target.getBoundingClientRect().width || 0.2*target.getBoundingClientRect().width;
  var tapThreshold = 15;
  var tapTime = 1000;
  var xDown = null;
  var yDown = null;
  var xPrev = null;
  var yPrev = null;
  var xUp = null;
  var yUp = null;
  var xMove = null;
  var yMove = null;
  var xDiff = null;
  var yDiff = null;
  var touchTime = null;
  var xVelocity = null;
  var yVelocity = null;
  var moveTime = null;

  function clear(){
    xDown = null;
    yDown = null;
    xPrev = null;
    yPrev = null;
    xUp = null;
    yUp = null;
    xMove = null;
    yMove = null;
    xDiff = null;
    yDiff = null;
    touchTime = null;
    xVelocity = 0;
    yVelocity = 0;
    moveTime = null;
  }

  function handleTouchStart(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if ( xDown || yDown ) {
      return;
    }
    xDown = evt.clientX || evt.touches[0].clientX;
    yDown = evt.clientY || evt.touches[0].clientY;
    xPrev = xDown;
    yPrev = yDown;
    xVelocity = 0;
    yVelocity = 0;
    touchTime = Date.now();
    moveTime = Date.now();
    touchCallback&&touchCallback({ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
  };

  function handleTouchMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if ( ! xDown || ! yDown ) {
      return;
    }

    xPrev = xUp || xPrev;
    yPrev = yUp || yPrev;

    xUp = evt.clientX || evt.touches[0].clientX;
    yUp = evt.clientY || evt.touches[0].clientY;

    xMove = xDown - xUp;
    yMove = yDown - yUp;
    xDiff = xUp - xPrev;
    yDiff = yUp - yPrev;
    xVelocity = 0.8*1000*xDiff/(1+Date.now()-moveTime)+0.2*xVelocity;
    yVelocity = 0.8*1000*yDiff/(1+Date.now()-moveTime)+0.2*yVelocity;

    if ( Math.abs( xMove ) > Math.abs( yMove ) ) {/*most significant*/
      if ( xMove > moveThreshold ) {
        /* left swipe */
        swipeCallback&&swipeCallback(0, 'left', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
        clear();
      }
      if ( xMove < -moveThreshold ) {
        /* right swipe */
        swipeCallback&&swipeCallback(1, 'right', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
        clear();
      }
    }
    else {
      if ( yMove > moveThreshold ) {
        /* up swipe */
        swipeCallback&&swipeCallback(2, 'up', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
        clear();
      }
      if ( yMove < -moveThreshold ) {
        /* down swipe */
        swipeCallback&&swipeCallback(3, 'down', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
        clear();
      }
    }
    moveCallback&&moveCallback(xDiff, yDiff, xVelocity, yVelocity, {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
  }

  function handleTouchEnd(evt){
    evt.stopPropagation();
    if(evt.touches&&evt.touches.length){
      return;
    }
    endCallback&&endCallback(xVelocity, yVelocity, {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
    if(Date.now()-touchTime<tapTime){
      if(!xMove||(xMove&&Math.abs(xMove-xDown)<tapThreshold&&Math.abs(yMove-yDown)<tapThreshold)){
        tapCallback&&tapCallback({ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
      }
    }
    clear();
  }
}
var swipe = {
  init: _init
};
var swipe_vue_mixin = {
  methods: {
    swipe_init: _init
  }
}
export { swipe as default, swipe_vue_mixin }