// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like : {
      type: Boolean
    },
    count: {
      type: Number
    },
    likeDisable: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: './images/like.png',
    unLikeSrc: './images/unlike.png',
    likeDisable : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
     // 组件中只实现客户端点击时候喜欢图片和个数的改变，对于api 的调用抛送给外部组件
     // like 0 不喜欢 1 喜欢
     onLike: function(){
       let likeDisable = this.data.likeDisable
       if (likeDisable) {
         return
       }

       let like = this.properties.like
       let count = this.properties.count

       if (!like) {
          count += 1
       } else {
         count -= 1
       }

       this.setData({
         count : count,
         like : !like
       })

       this.triggerEvent('like', {behavior:!like}, {})
     }
  }
})
