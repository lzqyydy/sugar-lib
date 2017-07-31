##Libs for self-use

###swipe.js

触摸操作模块
会输出滑动（四方向），点击，释放，拖动，轻触5个操作

有普通module和Vue mixin两种方式

使用：

普通模式

```
import swipe from './swipe.js'
swipe.init(target, swipeCallback, moveCallback, touchCallback, endCallback, tapCallback)
```

Vue mixin模式

```
import {swipe_vue_mixin} from './swipe.js'
Vue.component('foo', {
  template: '<div></div>',
  mixins: [swipe_vue_mixin],
  mounted: function(){
    this.swipe_init(this.$el, swipeCallback, moveCallback, touchCallback, endCallback, tapCallback);
  }
});
var vm = new Vue();
```

###canvas_downsample.vue

图片canvas降维的vue组件

:image指定图片链接，:max-width指定最大宽度，:max-height指定最大高度

最大宽度优先生效