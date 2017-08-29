//@touchstart="_handleStart" @touchmove="_handleMove" @touchend="_handleEnd" @touchcancel="_handleEnd" @mousedown="_handleStart" @mousemove="_handleMove" @mouseup="_handleEnd" @mouseleave="_handleEnd"

//touchCallback, moveCallback, endCallback, swipeCallback, tapCallback
export default { 
  data(){
    return {
      swipeParams: {
        _moveThreshold: 50,
        _tapThreshold: 15,
        _tapTime: 1000,
        _xDown: null,
        _yDown: null,
        _xPrev: null,
        _yPrev: null,
        _xUp: null,
        _yUp: null,
        _xMove: null,
        _yMove: null,
        _xDiff: null,
        _yDiff: null,
        _touchTime: null,
        _xVelocity: null,
        _yVelocity: null,
        _moveTime: null,
        _moved: false
      }
    };
  }, 
  methods: {
    _swipeClear(){
      this.swipeParams._xDown = null;
      this.swipeParams._yDown = null;
      this.swipeParams._xPrev = null;
      this.swipeParams._yPrev = null;
      this.swipeParams._xUp = null;
      this.swipeParams._yUp = null;
      this.swipeParams._xMove = null;
      this.swipeParams._yMove = null;
      this.swipeParams._xDiff = null;
      this.swipeParams._yDiff = null;
      this.swipeParams._touchTime = null;
      this.swipeParams._xVelocity = 0;
      this.swipeParams._yVelocity = 0;
      this.swipeParams._moveTime = null;
      this.swipeParams._moved = false;
    },
    _handleStart(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if ( this.swipeParams._xDown || this.swipeParams._yDown ) {
        return;
      }
      this.swipeParams._xDown = evt.clientX || evt.touches[0].clientX;
      this.swipeParams._yDown = evt.clientY || evt.touches[0].clientY;
      this.swipeParams._xPrev = this.swipeParams._xDown;
      this.swipeParams._yPrev = this.swipeParams._yDown;
      this.swipeParams._xVelocity = 0;
      this.swipeParams._yVelocity = 0;
      this.swipeParams._touchTime = Date.now();
      this.swipeParams._moveTime = Date.now();
      this.touchCallback&&this.touchCallback({ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
    },
    _handleMove(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if ( ! this.swipeParams._xDown || ! this.swipeParams._yDown ) {
        return;
      }

      this.swipeParams._xPrev = this.swipeParams._xUp || this.swipeParams._xPrev;
      this.swipeParams._yPrev = this.swipeParams._yUp || this.swipeParams._yPrev;

      this.swipeParams._xUp = evt.clientX || evt.touches[0].clientX;
      this.swipeParams._yUp = evt.clientY || evt.touches[0].clientY;

      this.swipeParams._xMove = this.swipeParams._xDown - this.swipeParams._xUp;
      this.swipeParams._yMove = this.swipeParams._yDown - this.swipeParams._yUp;
      this.swipeParams._xDiff = this.swipeParams._xUp - this.swipeParams._xPrev;
      this.swipeParams._yDiff = this.swipeParams._yUp - this.swipeParams._yPrev;
      this.swipeParams._xVelocity = 0.8*1000*this.swipeParams._xDiff/(1+Date.now()-this.swipeParams._moveTime)+0.2*this.swipeParams._xVelocity;
      this.swipeParams._yVelocity = 0.8*1000*this.swipeParams._yDiff/(1+Date.now()-this.swipeParams._moveTime)+0.2*this.swipeParams._yVelocity;

      if( !this.swipeParams._moved ){
        if ( Math.abs( this.swipeParams._xMove ) > Math.abs( this.swipeParams._yMove ) ) {/*most significant*/
          if ( this.swipeParams._xMove > this.swipeParams._moveThreshold ) {
            /* left swipe */
            this.swipeCallback&&this.swipeCallback(0, 'left', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
            this.swipeParams._moved = true;
          }
          if ( this.swipeParams._xMove < -this.swipeParams._moveThreshold ) {
            /* right swipe */
            this.swipeCallback&&this.swipeCallback(1, 'right', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
            this.swipeParams._moved = true;
          }
        }
        else {
          if ( this.swipeParams._yMove > this.swipeParams._moveThreshold ) {
            /* up swipe */
            this.swipeCallback&&this.swipeCallback(2, 'up', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
            this.swipeParams._moved = true;
          }
          if ( this.swipeParams._yMove < -this.swipeParams._moveThreshold ) {
            /* down swipe */
            this.swipeCallback&&this.swipeCallback(3, 'down', {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey})
            this.swipeParams._moved = true;
          }
        }
      }
      this.moveCallback&&this.moveCallback(this.swipeParams._xDiff, this.swipeParams._yDiff, this.swipeParams._xVelocity, this.swipeParams._yVelocity, {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
    },
    _handleEnd(evt){
      evt.stopPropagation();
      if(evt.touches&&evt.touches.length){
        return;
      }
      this.endCallback&&this.endCallback(this.swipeParams._xVelocity, this.swipeParams._yVelocity, {ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
      if(Date.now()-this.swipeParams._touchTime<this.swipeParams._tapTime){
        if(!this.swipeParams._xMove||(this.swipeParams._xMove&&Math.abs(this.swipeParams._xMove-this.swipeParams._xDown)<this.swipeParams._tapThreshold&&Math.abs(this.swipeParams._yMove-this.swipeParams._yDown)<this.swipeParams._tapThreshold)){
          this.tapCallback&&this.tapCallback({ctrlKey: evt.ctrlKey, altKey: evt.altKey, shiftKey: evt.shiftKey, metaKey: evt.metaKey});
        }
      }
      this._swipeClear();
    }
  }
}
