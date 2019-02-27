import { Http } from '../utils/http.js'


class RenderModel extends Http {
  wxIndex(data) {
    let params = {
      url: '/out/wxIndex', // 假数据
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }
}

export { RenderModel }