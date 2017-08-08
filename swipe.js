function _init(target, swipeCallback, moveCallback, touchCallback, endCallback, tapCallback, _moveThreshold){
  target.addEventListener('touchstart', handleTouchStart, {passive: false});        
  target.addEventListener('touchmove', handleTouchMove, {passive: false});      
  target.addEventListener('touchend', handleTouchEnd, {passive: false});

  var moveThreshold = _moveThreshold || 0.2*window.innerWidth;
  var tapThreshold = 15;
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
  var time = null;

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
    time = null;
  }                           

  function handleTouchStart(evt) { 
    evt.preventDefault();         
    if ( xDown || yDown ) {
      return;
    }
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;        
    xPrev = xDown;
    yPrev = yDown;    
    time = Date.now(); 
    touchCallback&&touchCallback();                               
  };                                                

  function handleTouchMove(evt) {   
    evt.preventDefault();        
    if ( ! xDown || ! yDown ) {
      return;
    }

    xPrev = xUp || xPrev;
    yPrev = yUp || yPrev;     

    xUp = evt.touches[0].clientX;                                    
    yUp = evt.touches[0].clientY;

    xMove = xDown - xUp;
    yMove = yDown - yUp;
    xDiff = xUp - xPrev;
    yDiff = yUp - yPrev;
    // console.log('xDiff:', xDiff, 'yDiff', yDiff)

    if ( Math.abs( xMove ) > Math.abs( yMove ) ) {/*most significant*/
      if ( xMove > moveThreshold ) {
        /* left swipe */
        swipeCallback&&swipeCallback(0, 'left')   
        clear();     
      } 
      if ( xMove < -moveThreshold ) {
        /* right swipe */
        swipeCallback&&swipeCallback(1, 'right')
        clear();     
      }                       
    } 
    else {
      if ( yMove > moveThreshold ) {
        /* up swipe */ 
        swipeCallback&&swipeCallback(2, 'up')
        clear();     
      } 
      if ( yMove < -moveThreshold ) {
        /* down swipe */
        swipeCallback&&swipeCallback(3, 'down')
        clear();     
      }                                                                 
    }
    moveCallback&&moveCallback(xDiff, yDiff);          
  }

  function handleTouchEnd(evt){
    if(evt.touches.length){
      return;
    }
    endCallback&&endCallback();
    if(Date.now()-time<1000){
      if(!xMove||(xMove&&Math.abs(xMove-xDown)<tapThreshold&&Math.abs(yMove-yDown)<tapThreshold)){
        tapCallback&&tapCallback();
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