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