<template>
  <canvas></canvas>
</template>

<script>
export default {
  data (){
    return {

    }
  },
  props: ['src', 'maxWidth', 'maxHeight'],
  methods: {
    draw (value){
      if(value!==''){
        var canvas = this.$el;
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          if(this.maxWidth){
            canvas.width = img.width>this.maxWidth?this.maxWidth:img.width;
            canvas.height = img.width>this.maxWidth?img.height*this.maxWidth/img.width:img.height;
          }
          else if(this.maxHeight){
            canvas.height = img.height>this.maxHeight?this.maxHeight:img.height;
            canvas.width = img.height>this.maxHeight?img.width*this.maxHeight/img.height:img.width;
          }
          else{
            canvas.width = img.width;
            canvas.height = img.height;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = value;
      }

    }
  },
  watch: {
    src (newValue){
      this.draw(newValue);
    }
  },
  mounted (){
    if(this.src!==''){
      this.draw(this.src);
    }
  }
}
</script>

<style type="stylus" scoped>
</style>