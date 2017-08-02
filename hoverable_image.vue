<template>
  <!-- <div @mouseenter="enter" @mouseout.self="leave">
    <img @mouseenter.stop="block" :src="src" :class="{bigger: hovered}">
  </div> -->
  <div>
    <img :src="src" :class="{bigger: hovered}">
  </div>
</template>

<script>
export default {
  data (){
    return {
      hovered: false
    }
  },
  props: ['src', 'scale'],
  methods: {
    block (e){
      e.stopPropagation();
      console.log('block', e, e.target);
    },
    enter (e){
      console.log('enter', e, e.target);
      this.hovered = true;
    },
    leave (e){
      console.log('leave', e, e.target);
      this.hovered = false;
    }
  },
  watch: {
  },
  mounted (){
    this.$el.addEventListener('mouseenter', this.enter, false);
    this.$el.addEventListener('mouseleave', this.leave, false);
  }
}
</script>

<style type="stylus" scoped>
div{
  position: relative;
  display: inline-block;
  z-index: 10;
  background-color: #ccc;
}
img{
  position: relative;
  width: 120%;
  height: 120%;
  transition: all .2s ease-out;
  box-shadow: 3px 3px 3px #ccc;
  z-index: -1;
}
.bigger{
  transform: scale(2);
}
</style>