import {config} from '../config.js'

class Http
{
  errorCode = {
    1: '未知错误',
    1005: '不正确的appkey',
    1007: '请求了路径不正确'
  }

  http(params) {
    wx.request({
      url: config.base_url + params.url, // 仅为示例，并非真实的接口地址
      data: params.data || {},
      header: {
        appkey: config.appkey
      },
      method : params.method || 'Get',
      success:(res)=>{
        let code = res.statusCode.toString() 
        let data = res.data
        if (code.startsWith(2)) {
          params.success(data)
        } else {
          let err = res.data.error_code || 1;
          this._show_error(err)
        }
      },
      fail:(error)=> {
        this._show_error(1);
      }
    })
  }

  newHttp(params) {
    let req = (resolve, reject) => {
      wx.request({
        url: config.base_url + params.url, // 仅为示例，并非真实的接口地址
        data: params.data || {},
        header: {
          appkey: config.appkey
        },
        method: params.method || 'Get',
        success: (res) => {
          let code = res.statusCode.toString()
          let data = res.data
          if (code.startsWith(2)) {
            resolve(res)
          } else {
            let err = res.data.error_code || 1;
            console.log(err)
            this._show_error(err) // 还是要多看看promise
          }
        },
        fail: (error) => {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    let pro = new Promise(req)
    
    pro.catch((error) => {
      this._show_error(error);
    })
    return pro
  }

  _show_error(err) {
    
    wx.showToast({
      title: this.errorCode[err] || this.errorCode[1],
      icon: 'none',
      duration: 2000
    })
  }

}

export {Http}