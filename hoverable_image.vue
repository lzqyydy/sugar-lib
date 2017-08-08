<template>
  <div id="root">
    <img :src="src" :class="{bigger: hovered}">
    <div class="mask" @mouseenter="enter" @mouseout.self="leave"></div>
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
  }
}
</script>

<style type="stylus" scoped>
#root{
  position:relative;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .2s ease-out;
  box-shadow: 3px 3px 3px #ccc;
}
.bigger{
  transform: scale(2);
}
</style>