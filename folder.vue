<template>
  <div :class="{'folder': !inline, 'folder-inline': inline}">
    <div :class="{'collapsed': collapse}" @mousedown="op" @touchstart="op">{{name}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: true
    };
  },
  props: ['inline', 'name'],
  methods: {
    op(){
      this.collapse = !this.collapse
    }
  },
  components: {
  }
}
</script>

<style scoped>
.collapsed ~ *{
  transition: height 0.5s ease-out;
  height: 0;
  overflow: hidden;
  /*display: none;*/
}
</style>