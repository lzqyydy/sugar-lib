<template>
  <div class="folder">
    <div class="folder-hint" :class="{'folder-collapsed': collapse}" @mousedown="op" @touchstart="op">{{name}}</div>
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
  props: ['name'],
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
.folder-hint{
  width: 50%;
  background-color: #ccc;
  /*background: #F8BB44;*/
}
.folder-collapsed ~ *{
  transition: height 0.5s ease-out;
  height: 0;
  overflow: hidden;
  /*display: none;*/
}
</style>