// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     end: {
       type:Boolean,
       value: true
     },
     start: {
       type: Boolean,
       value: false
     },
     content: {
       type: String
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    onLeft: function() {
      if (!this.properties.end) {
        this.triggerEvent('left', {}, {});
      }
    },
    onRight: function() {
      
      if (!this.properties.start) {
        this.triggerEvent('right', {}, {});
      }
    }
  }
})
