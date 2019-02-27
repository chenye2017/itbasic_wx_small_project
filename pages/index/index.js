import {LoginModel} from '../../model/loginModel.js'

import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

var login = new LoginModel()

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo, this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
      wx.setStorageSync('userinfo', app.globalData.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.setStorage({
          key: 'u',
          data: res.userInfo
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('sss')
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  getUserInfo: function(e) {
    
    app.globalData.userInfo = e.detail.userInfo
    console.log('sss')
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    
  },

  userLogin: function() {
    // 小程序登陆获取用户微信号
    let u =wx.getStorageSync('u')
    wx.login({
      success: (res) => {
        let code = res.code
        let data = {
          code,
          nickname: u.nickName
        }
        let loginP = login.userLogin(data)
        console.log(res.code)
        loginP.then((res) => {
          
          let data = res.data
          if (data.code == 200) {
          
            let token = data.data
            wx.setStorage({
              key: 'token',
              data: token,
              success: function() {
                Toast.success('login success')
              }
            }) 
          } else {
            Toast.success(data.msg)
          }
        })
      },
      fail: () => {

      }
    })
  },

  
})
