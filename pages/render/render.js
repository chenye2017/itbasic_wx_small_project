// pages/render/render.js
import {RenderModel} from '../../model/renderModel.js'

let render = new RenderModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let token = wx.getStorageSync('token');
    let u = wx.getStorageSync('u');
    
        let data = {
          token,
          nickname:u.nickName
        }

        // 请求首页数据
        let rp = render.wxIndex(data)
        rp.then((res) => {
          console.log(res)
          let userinfo = res.data
          userinfo.avatar = 'https://itbasic.datatom.com'+userinfo.userpic
          this.setData({
            userinfo
          })
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

  leaveClick: function() {
    wx.navigateTo({
      url: '/pages/leave/leave'
    })
  },


  returnLogin: function() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})