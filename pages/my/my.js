import {MyModel} from '../../model/myModel.js'

let my = new MyModel()

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              let userInfo = res.userInfo
            
              that.setData({
                userInfo,
                isAuth: true
              })
            }
          })
        }
      }
    })

    let likeCountPromise = my.likeBookCount()
    likeCountPromise.then((res)=>{
      this.setData({
        count:res.data.count
      })
    })
    
    let likeBookPromise = my.likeBookDetail()
    likeBookPromise.then((res) => {
      console.log(res.data)
      if(res.data.length < 1) {
        res.data =[ {
          "content": "人生不能像做菜，把所有的料准备好才下锅",
          "fav_nums": 1,
          "id": 1,
          "image": "http://bl.7yue.pro/images/movie.8.png",
          "pubdate": "2018-06-22",
          "title": "李安<<饮食男女>>",
          "type": 100
        }, { "content": "你陪我步入蝉夏 越过城市喧嚣", "fav_nums": 130, "id": 2, "image": "http://bl.7yue.pro/images/music.1.png", "index": 3, "like_status": 0, "pubdate": "2018-06-22", "title": "花粥 《纸短情长》", "type": 200, "url": "http://music.163.com/song/media/outer/url?id=557581284.mp3", "start": false, "end": false, "lastIndex": 8 }, { "content": "在变换的生命里，岁月原来是最大的小偷", "fav_nums": 126, "id": 2, "image": "http://bl.7yue.pro/images/movie.4.png", "index": 4, "like_status": 0, "pubdate": "2018-06-22", "title": "罗启锐《岁月神偷》", "type": 100, "start": false, "end": false, "lastIndex": 8 }
        
        ]
     
        res.data.forEach((value,key,arr) => {
          if (value.type == 100) {
            value.type_cn = '电影'
          } else if (value.type == 200) {
            value.type_cn = '音乐'
          } else if (value.type == 300) {
            value.type_cn = '句子'
          }
        })
    
        
        this.setData({
          details: res.data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  redirectMe: function(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
    
  },

  bindGetUserInfo: function(event) {
    let userInfo = event.detail.userInfo;
    this.setData({
      userInfo,
      isAuth: true
    })
  }
})