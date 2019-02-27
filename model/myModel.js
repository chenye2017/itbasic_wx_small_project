import { Http } from '../utils/http.js'

class MyModel extends Http {
  likeBookCount() {
    let params = {
      url: '/book/favor/count' // 假数据
    }
    let pro = this.newHttp(params)
    return pro
  }

  likeBookDetail() {
    let params = {
      url : '/classic/favor'
    }
    let pro = this.newHttp(params)
    return pro
  }
}

export { MyModel }