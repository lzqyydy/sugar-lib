<template>
  <div class="scrollView">
    <div class="scrollContainer" :class="{vertical: vertical, horizontal: !vertical, smoothing: smoothing}" :style="{transform: vertical?'translateY('+ -offsetY +'px)':'translateX('+ -offsetX +'px)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {clip} from './util.js'
import {swipe_vue_mixin} from './swipe.js';

export default {
  data (){
    return {
      offsetX: 0,
      offsetY: 0,
      smoothing: false
    }
  },
  mixins: [swipe_vue_mixin],
  props: ['vertical'],
  methods: {
    touchHandler: function(){
      this.smoothing = false;
      var rbc = this.$el.getBoundingClientRect();
      var cbc = this.$el.children[0].getBoundingClientRect();
      if(this.vertical){
        this.offsetY = rbc.top-cbc.top;
      }
      else{
        this.offsetY = rbc.left-cbc.left;
      }
    },
    moveHandler: function(dx, dy){
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
    endHandler: function(vx, vy){
      if(vx!==0||vy!==0){
        var rbc = this.$el.getBoundingClientRect();
        var cbc = this.$el.children[0].getBoundingClientRect();
        this.smoothing = true;
        if(this.vertical){
          this.offsetY -= vy;
          this.offsetY = clip(this.offsetY, 0, cbc.height-rbc.bottom+rbc.top);
        }
        else{
          this.offsetX -= vx;
          this.offsetX = clip(this.offsetX, 0, cbc.width-rbc.right+rbc.left);
        }
      }
    }
  },
  mounted (){
    // setInterval(() => {
    //   this.offsetY = 1000 - this.offsetY;
    // }, 5000);
    this.swipe_init(this.$el.children[0], this.touchHandler, this.moveHandler, this.endHandler, null, null, 1000);
  }
}
</script>

<style scoped>
.scrollView{
  max-width: 100vw;
  max-height: 100vh;
  white-space: nowrap;
  overflow: hidden;
}
.scrollContainer.smoothing{
  transition: 1.4s transform ease-out;
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