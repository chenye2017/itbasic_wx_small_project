import { Http } from '../utils/http.js'

class LoginModel extends Http {
  userLogin(data) {
    let params = {
      url: '/login/getUserWxInfo', // 假数据
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }
}

export { LoginModel }