import {ClassicModel} from '../../model/classicModel.js'
import {Http} from '../../utils/http.js'

let classicModel = new ClassicModel()
let http = new Http()
// pages/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    classicModel.getLast((res) => {
      let lastIndex = res.index;
      let start = false;
      let end = true;
      if (res.index == 1) {
        start = true;
      }
      res.start = start;
      res.end = end;
      res.lastIndex = lastIndex;
      
      this._setClassicStorage(res.index, res)

      this.setData({
        classic:res
      })
    });
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

  onLike:function(event) {
    let like = event.detail.behavior
    let url = ''

    if (like) {
      url = '/like'
    } else {
      url = '/like/cancel'
    }

    let params = {
      method: 'POST',
      success: ()=> {},
      url : url,
      data : {
        type: 100,
        art_id: this.data.classic.id
      }
    }
    http.http(params)
  },

  onLeft: function() {
    let index = this.data.classic.index
    let type = 'next'

    // 如果有缓存，直接从缓存里面取
    let storage = this._getClassicStorage(index+1);
    if (storage) {
      this._getClassicStorage()
      return
    }

    classicModel.getClassic(index,type, (res)=> {
      res = this._checkStartAndEnd(res);
      // 插入缓存中
      this._setClassicStorage(index + 1, res)

      this.setData({
        classic: res
      })
    })
  },


  onRight: function () {
    let index = this.data.classic.index
    let type = 'previous'
    let storage = this._getClassicStorage(index-1)
    if (storage) {
      return
    }
    
    classicModel.getClassic(index, type, (res) => {
        res = this._checkStartAndEnd(res)
        this._setClassicStorage(index - 1, res)
        this.setData({
          classic:res
        })
    })
  },

  _checkStartAndEnd: function(res) {
    let start = false;
    let end = false;

    if (res.index == 1) {
      start = true;
    }
    
    if (res.index == this.data.classic.lastIndex) {
      end = true;
    }
    res.start = start;
    res.end = end;
    res.lastIndex = this.data.classic.lastIndex;
    return res;
  },

  _getStorageKey: function() {
    return 'classic_';
  },

  _getClassicStorage: function(index) {
    let key = this._getStorageKey() + index;
    let content = wx.getStorageSync(key)
    
    if (content) {
      let res = content
      //content = this._checkPlay();
      this.setData({
        classic: res
      })
      return content;
    }
    return false;
  },

  _setClassicStorage: function(index, res) {
    let key = this._getStorageKey() + index;
    //res = this._checkPlay();
    wx.setStorageSync(key, res)
  }

 
})