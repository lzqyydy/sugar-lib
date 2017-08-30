<template>
  <div class="scrollView">
    <div class="scrollContainer" @touchstart="_handleStart" @touchmove="_handleMove" @touchend="_handleEnd" @touchcancel="_handleEnd" @mousedown="_handleStart" @mousemove="_handleMove" @mouseup="_handleEnd" @mouseleave="_handleEnd" :class="{vertical: vertical, horizontal: !vertical, smoothing: smoothing}" :style="{transform: vertical?'translateY('+ -offsetY +'px)':'translateX('+ -offsetX +'px)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {clip, findClosest} from './util.js'
import swipe_vue from './swipe_vue.js';
export default {
  data (){
    return {
      offsetX: 0,
      offsetY: 0,
      smoothing: false
    }
  },
  mixins: [swipe_vue],
  props: ['vertical', 'slots'],
  methods: {
    touchCallback: function(){
      this.smoothing = false;
      //root bounding client
      var rbc = this.$el.getBoundingClientRect();
      //container bounding client
      var cbc = this.$el.children[0].getBoundingClientRect();
      if(this.vertical){
        this.offsetY = rbc.top-cbc.top;
      }
      else{
        this.offsetX = rbc.left-cbc.left;
      }
    },
    moveCallback: function(dx, dy){
      var rbc = this.$el.getBoundingClientRect();
      var cbc = this.$el.children[0].getBoundingClientRect();
      if(this.vertical){
        this.offsetY -= dy;
        this.offsetY = clip(this.offsetY, 0, cbc.height-rbc.bottom+rbc.top);
      }
      else{
        this.offsetX -= dx;
        this.offsetX = clip(this.offsetX, 0, cbc.width-rbc.right+rbc.left);
      }
    },
    endCallback: function(vx, vy){
      if(vx!==0||vy!==0){
        var rbc = this.$el.getBoundingClientRect();
        var cbc = this.$el.children[0].getBoundingClientRect();
        this.smoothing = true;
        if(this.vertical){
          this.offsetY -= vy;
          if(this.slots){
            this.offsetY = findClosest(this.slots, this.offsetY);
          }
          this.offsetY = clip(this.offsetY, 0, cbc.height-rbc.bottom+rbc.top);
        }
        else{
          this.offsetX -= vx;
          if(this.slots){
            this.offsetX = findClosest(this.slots, this.offsetX);
          }
          this.offsetX = clip(this.offsetX, 0, cbc.width-rbc.right+rbc.left);
        }
      }
    }
  }
}
</script>

<style>
.scrollView{
  max-width: 100vw;
  max-height: 100vh;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}
/*.scrollContainer{
  max-width: initial;
  max-height: initial;
}*/
.scrollContainer.smoothing{
  transition: 1.2s transform ease-out;
}
.scrollContainer.vertical{
  display: block;
}
.scrollContainer.horizontal{
  display: inline-block;
}
.scrollContainer.vertical > *{
  display: block;
}
.scrollContainer.horizontal > *{
  display: inline-block;
}
</style>