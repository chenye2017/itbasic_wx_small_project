import {Http}  from '../utils/http.js'

class ClassicModel extends Http
{
  getLast(callBack){
    let params = {
      url: '/classic/latest',
      success: callBack
    }
    this.http(params)
  }

  getClassic(index,type,callback) {
    

    let params = {
      url: '/classic/'+index+'/'+type,
      success: callback
    }
    this.http(params)
  }

}

export {ClassicModel}